import { Route, Switch } from "wouter";
import { Intro } from "./pages/lucid-intro";
import { DomainUpdate } from "./pages/lucid-domain-update";

const routes = [
  { path: "/lucid-intro", name: "Lucid Intro", component: Intro },
  {
    path: "/lucid-domain-update",
    name: "lucid.so Announcement",
    component: DomainUpdate,
  },
];

const Home = () => {
  return (
    <div className="w-[20rem] mx-auto flex flex-col items-center mt-24">
      <h1 className="text-2xl w-full text-left font-bold">
        Siddharth's Crafts
      </h1>
      <ol className="mt-8 space-y-4 w-full text-left pl-4 list-decimal">
        {routes.map((route) => (
          <li key={route.path} className="pl-2">
            <a href={route.path} className="text-lg transition-colors">
              {route.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} component={route.component} />
      ))}
    </Switch>
  );
};
