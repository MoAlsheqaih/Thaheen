import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { useState } from "react";

import StudentsTable from "./StudentsTable";
import CoursesTable from "./CoursesTable";
import Activities from "../Activities";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TabSection() {
  const [tabs] = useState(["Students", "Courses", "Activities"]);

  return (
    <div className="w-full mt-10">
      <TabGroup>
        <TabList className="flex space-x-4 rounded-xl bg-[#FFF7EC] p-1 w-fit mx-auto">
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
        </TabList>

        <TabPanels className="mt-6">
          <TabPanel id="students">
            <StudentsTable />
          </TabPanel>

          <TabPanel>
            <CoursesTable />
          </TabPanel>

          <TabPanel>
            <div className="text-center">
              <Activities />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TabSection;
