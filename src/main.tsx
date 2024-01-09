import { StrictMode } from "react";
// PLUGINS
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// STORE
import { store } from "./store";
// COMPONENTS
import App from "./App";
// TAILWIND CSS
import "./index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
	<StrictMode>
		<Provider store={store()}>
			<App />
		</Provider>
	</StrictMode>,
);
