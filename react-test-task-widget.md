### Summary

A capable candidate should create a responsive weather widget using React/NextJS as the base technology. The widget should display the current weather at the user's location and the weather forecast for the next several days.

The widget should have three sizes: small [2x2], wide [4x2], and large [4x4], and it should adapt to the size of the container it is placed in.

The amount and type of data displayed in each size is up to the developer.

It is up to the developer to decide how the widget should look and what style, colors, and fonts to use. An attachment provides an example of the final widget and may be used for inspiration (but not as a direct copy).

### Tech Requirements and Proposals

The widget markup should be built on top of modern design system principles. The recommended library is MaterialUI v5, as we heavily rely on it in our daily processes, but it is not a strict requirement. Alternatives such as ChakraUI, Shadcn, Ant, NextUI, Mantine, Bootstrap, etc., are also good choices. The intent is to see how the developer can work with a design system and use its semantic, structural, and layout components to build the widget's skeleton.

The weather data should be fetched from a free weather API, such as OpenWeatherMap or WeatherAPI. The candidate should demonstrate knowledge of working with REST APIs and handling the data in React components.

https://openweathermap.org/api/one-call-3

https://www.weatherapi.com/docs/

https://publicapis.dev/search?q=weather

It should show appropriate states / placeholders when the data is being fetched, when the data is fetched successfully and when there is an error.

Demonstrate the understaning of React contexts / providers / hooks by using them to manage the state of the widget. No prop drilling, please.

The set of icons and / or background images could be taken from any SVG icons library, like:

https://iconscout.com/icon-packs/weather?curated_assets=true

https://icons8.com/icons/set/weather

### Bonus points

- **User Input**: Include an input field/settings form for the user to enter the location for which they want to see the weather. This demonstrates knowledge of working with forms in React.

- **Server-Side Rendering (SSR)**: Fetch widget data on the server side of the NextJS app to demonstrate knowledge of SSR.

- **Animate** changes in the state and size of the widget.

- **Theme** : reflect the current browser theme (dark / light) in the widget design.

- Use **CSS container** media queries.

- Background color / image of the widget could also reflect the current weather along with displayed icon.

### Notes

- _Manage your time; this task should not take more than 8 hours of work. If you feel that you are spending too much time on a single part of the task, please move on to the next part and come back to it later._

- _Some of the requirements consist of repeated steps, like creating markup for different sizes of the widget. The developer should demonstrate knowledge of the DRY principle and avoid code duplication. Demonstrating this has more weight than the actual implementation, which can be skipped for the sake of time._

- _Some REST APIs require precise location coordinates, some require city names, while others need city IDs. The candidate should demonstrate knowledge of working with different types of APIs and clarify the available and needed data to complete the task (even if it requires some additional requests/APIs not described in the initial spec)._

- _Injecting the widget into the grid of icons requires taking into account not only the cell/column width but also the gaps/spacers between the cells. The widget should adapt to the grid layout and fill the available space._

Codebase of the finished application should be pushed to a public repository on GitHub. The repository should contain a README.md file with instructions on how to run the application locally.
