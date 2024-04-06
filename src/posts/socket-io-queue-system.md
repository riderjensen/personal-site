---
  title: "Simple Queue System With Socket.io"
  date: "2024-04-06"
  excerpt: "I created a simple queueing system with Socket.io and Node.js in order to offload long asynchronous tasks outside of the event loop while leveraging an event based messaging system."
  img: "posts/socket-io-queue-system/laptop-next-to-plant.jpg"
  alt: "Laptop with code and plant in coffee shop"
---

![Laptop with code and plant in coffee shop](/images/posts/socket-io-queue-system/laptop-next-to-plant.jpg)
*Photo by [James Harrison](https://unsplash.com/photos/black-laptop-computer-turned-on-on-table-vpOeXr5wmR4) on Unsplash.*

Much of my career so far has been working on the internet in a request-response paradigm (creating and consuming APIs) but I have always loved the concept of message queues and the potential power they have when it comes to offloading work and scaling. I had an idea to create a simple message queue system where asynchronous actions could be accomplished by an infinitely scaling amount of workers. I didn't do any research on how this could be done/if it had been done because it is more fun to just try things instead of getting bogged down with research and complexity.

## Beginnings

I was talking with a close friend of mine some weeks ago about how my mind is pushing me to create something but it had no goal or project in mind. The problem with feeling the need to be productive but having no objective is that you are liable to get sucked into something big and then quit because it takes so long. Instead, I made a conscious decision to limit my scope to about a day of work. The project I would take on wouldn't deal with edge cases, didn't need types, and most certainly didn't need tests. Coding for perfection is a good way to never complete anything.

While out walking the next morning, the idea came to me to create a simple queue in [Node.js](https://nodejs.org) that would allow for asynchronous tasks of unspecified length while a user waited. This would differ from the previous pattern I had mostly worked in because the amount of time for a response could be totally variable based on the length of the asynchronous task instead of the usual HTTP requests that I deal with that timeout after a certain amount of time (dependent on browser). As I walked, I formulated a few specifications:

- A client should be able to send a message to the server and have it added to the queue
- A client didn't need to stay connected in order for the work to complete
- The workers should be their own processes outside of the application that start up on their own and connect to the queue system
- The queue should be able to scale with an infinite amount of workers
- A worker who completes a task should start another immediately if there is one available
- When a worker fails, the job is returned to the queue and picked up by the next available worker

With these specifications in mind, I chose [Socket.io](https://socket.io/) because I have used it before on an old project and that meant I could get up and running faster without having to learn something totally new. Socket.io was probably overkill for this project; it has so many great and useful features but for this project we are using the most basic of it's functions; the only real thing we are getting out of it is an event based open line of communication that we use to kick off jobs and keep our client informed of the status.

## The Application

You can view the full source code at [GitHub - Simple Queue](https://github.com/riderjensen/simple-queue) so I wont be posting much here except a few highlights. Here is how the application is setup:

![Three boxes on the left are labeled as Clients. One arrow from each box points to a box in the middle of the picture. The middle box is labeled as App. Two arrows on the right side of the box labeled App point to two boxes on the right labeled Worker](/images/posts/socket-io-queue-system/architecture.png)

There can be many clients who all push events to the application. Within the application is an array which holds all the events that are waiting to be processed. When a new event is pushed up to the application, it emits an event back to all the clients letting them know the status of the queue and the items that are in progress. This work queue is visually represented in the index.html file within the project, below is a screenshot of what the frontend looks like:

![A screenshot of a browser, the URL bar reads "localhost:3000" and there are four buttons, each indicating an amount in seconds when clicked. Below that is a heading named "Queue" with jobs waiting to be picked up. Below that is a heading named "In Progress" with nothing underneath it.](/images/posts/socket-io-queue-system/initial-queue.PNG)

Within the application, there is really one line of work that happens. When users push events up to the queue we add them to the existing stack of jobs. Workers only receive a "kickoff" event if the queue is empty since workers are designed to work until the queue is empty and then simply idle. Otherwise, workers are self propelling.


## The Workers

I created the workers as their own processes that can spin up and process jobs when you want them to. Right now we spin them up manually but you could easily create a function that spins workers up or down based the current load. A "completed" event from a worker is an indication that the previous job has finished processing and now it is ready for more work. On start up, the workers also emit a "completed" event with no message body to the application; this is done for code reuse and to keep the worker logic simple. When a worker starts a job, we remove the first item in the job queue and move it to a new array called the progress queue; this progress queue keeps track of currently running jobs. While in progress, you can see how many workers you have running and what job they are working on in the UI.

![A screenshot of a browser showing a few buttons and a few headings. The "In Progress" heading now has a job underneath it](/images/posts/socket-io-queue-system/job-in-progress.PNG)

Each time a job starts or ends, we emit the job queue and the progress queue to all connected clients. If a worker finishes a job and there are no more events in the job queue, the worker is moved to an idle queue and it waits until a new job is received.

## Redundancy

No worker is perfect and who knows what errors we might run into. I included a basic redundancy for when a worker disconnects from the application. Upon receiving a disconnect event, we check the in progress queue to see if it had a currently running job. If there was a job being processed, we move that job back to the job queue in the first position so that when the next worker finishes its' job, the previously failed job will get processed next.

## In Action

Because I don't have a lot of asynchronous tasks to complete, the workers are coded to take in a time in seconds and simply run a `setTimeout` function and return after that is complete. The worker code is actually very simple overall:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Emit a complete event after connection to let the main application
// know we are ready for work
socket.emit("complete");

socket.on('job', async (msg) => {
    console.log(`Starting job for ${msg.t} seconds`);
    await timeout(msg.t * 1000);
    console.log(`Job complete for ${msg.t} seconds`);
    socket.emit("complete", { workerId: socket.id });
});

socket.on('kickoff', () => {
    socket.emit("complete");
});

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

You can see on startup, we emit that `complete` event to tell the application that we are ready to process. Then we have a generic listener for `job` in order to process a job. And we also have a `kickoff` listener that emits another `complete` event for when the queue is empty and we have a new set of jobs come in. The nice thing about this architecture is that you can define any number of events within this worker that each have their own functions. Then based on what is in the job queue, it could reference any number of jobs that you save within the file. As long as you end your job by emitting the `complete` event, there will be no trouble picking up the next job available.

## Conclusion

I made this project for fun and it is clearly incomplete and perhaps even totally useless. I didn't look to see if this was made already or if someone needed something like this. I didn't make this to sell some app or boost my GitHub stars. I didn't even check if I had the right tools. I had an idea about something that always interested me and I decided to just make an implementation of it with the tools I know how to use. Often, I feel burdened when I want to start something new for various reasons. Maybe the scope is too big, maybe someone already did it, maybe I just look around and feel like everyone is better than me at coding so what is the point?

But when I was talking with my friend about feeling like I needed to be productive but having nothing to work on, I realized that there were a million things to do but that I kept choosing things that were just too big. I would say I want to make a mobile app or I want to write a webapp but these projects are large and they take months/years to complete. Somewhere in the past, I lost my love of tinkering and put my focus on trying to make things to sell to people and it feels terrible. The paralysis I was feeling about working on things was because I felt like I had to create the next big thing which means I had to have the next big idea which means I had to really think hard and choose the right technology which means that I was never actually doing anything at all. No matter how buggy the implementation, or how stupid the idea, or how solved the problem is already, I wrote a functioning message queue that worked. There is enjoyment in solving problems for yourself even if someone else already solved them.

My final note on this project comes from a short essay from [Strangest Loop](https://strangestloop.io/essays/things-that-arent-doing-the-thing):

```text
Preparing to do the thing isn't doing the thing.

Scheduling time to do the thing isn't doing the thing.

Making a to-do list for the thing isn't doing the thing.

Telling people you're going to do the thing isn't doing the thing.

Messaging friends who may or may not be doing the thing isn't doing the thing.

Writing a banger tweet about how you're going to do the thing isn't doing the thing.

Hating on yourself for not doing the thing isn't doing the thing.
Hating on other people who have done the thing isn't doing the thing.
Hating on the obstacles in the way of doing the thing isn't doing the thing.

Fantasizing about all of the adoration you'll receive once you do the thing isn't doing the thing.

Reading about how to do the thing isn't doing the thing.
Reading about how other people did the thing isn't doing the thing.
Reading this essay isn't doing the thing.

The only thing that is doing the thing is doing the thing.
```