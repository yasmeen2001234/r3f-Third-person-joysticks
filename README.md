This project include WASD and Joysticks movement with react three fiber

The project uses the library
https://www.npmjs.com/package/@bonuz/react-three-third-person

Which was edited and updated from the original library 
https://github.com/mannynotfound/react-three-third-person


After cloning the repo run the following commands:

- npm install or npm install --force ( incase you faced dependency error )

- npm run dev


Frustum culling is a technique used in computer graphics to improve performance by determining which objects in a 3D scene are visible within the camera's view frustum and should be rendered, and which objects are outside the frustum and can be skipped.

This video shows that whenever the bird is inside the player's view, it is rendered, and otherwise, it is removed from the scene.

To make it more clear , I added console logs
