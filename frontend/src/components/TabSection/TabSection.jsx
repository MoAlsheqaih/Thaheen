import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";
import CoursesTable from "../CoursesTable/CoursesTable"; // ✅ Fixed path
import Activities from "../Activities";
import StudentTable from "./StudentTable";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabSection = () => {
  const [tabs] = useState(["Student", "Courses", "Activities"]);

  return (
    <div className="w-full mt-10">
      <Tab.Group>
        <Tab.List className="flex space-x-4 rounded-xl bg-[#FFF7EC] p-1 w-fit mx-auto">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none",
                  selected
                    ? "bg-white text-orange-500 shadow"
                    : "text-gray-500 hover:text-orange-400"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <StudentTable />
          </Tab.Panel>
          <Tab.Panel>
            <CoursesTable />
          </Tab.Panel>
          <Tab.Panel>
            <div className="text-center">
              <Activities />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabSection;
