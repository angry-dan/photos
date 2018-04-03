See it running [here](https://photos-a9208.firebaseapp.com/).

This is an experiment with displaying photos pulled from Flickr's API, using a minimal toolset.

## It uses

* Babel, because modern JavaScript tools are a must.
* PostCSS, but not SASS. Because SASS is bloated, and actually just writing CSS is not hard.
* Parcel instead of Webpack, because the defaults are sensible and it avoids a config file.
* CSS animations. I actually wanted to use https://popmotion.io/ because I'm keen on it's funcitonal reactive style, but in reality it just didn't fit in with the declarative approach.
* Preact without JSX, mostly as an experiment vs React. It was fun to work with a minimal toolset and helps to demonstrate how the underlying libraries are working.

# Build + run

1.  Grab this codebase.
2.  Run `yarn` to install dependencies (`npm install` should work too).
3.  `yarn start` (`npm run start`) and visit http://localhost:1234/ to see it running.

# Codebase

The app is built on Preact, which is a lighweight React alternative. Preact's API is inspired by Hyperscript and the app uses Hyperscript helpers to save a few keystrokes.

In the `src/components` folder app is split into distinct React style components - there's nothing too groundbreaking there. Search is using the fetch API to query Flickr's API, and it's debounced to avoid flooding (Netflix have a better way of answering this with streams - https://youtu.be/AslncyG8whg?t=11m4s). There's also a preloader component which delays rendering the images until they're loaded to make the animation run smoothly. The photos component deals with rendering the images and the card flip animation.

# What's next

I was keen to introduce the fade in animation after loading the images, but the effect is a bit limited on desktop machines (try it on a mobile to see the cards nicely fade in). Conversly although I was also keen on the card flip to display the image details which worked well on a desktop, the cards turned out to be too small on mobile. So I think reworking one of those animations or the layout responsively would help.

Sort out the babel polyfill. Right now the js bundle size is a little bigger than I would like, mostly because of all the polyfill code that get's loaded; ideally this would be swapped for an ajax call to load the code only on machines that need it.
