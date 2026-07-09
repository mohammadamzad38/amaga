"use client";

import Sort from "../../sort";
import JobCard from "./jobCard";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import OriginDropdown from "../../originDropdown";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import { sign } from "crypto";

const categoriesList = [
  { label: "Fabric Cutting Pattern", value: 59 },
  { label: "Knit Print Design", value: 60 },
  { label: "Woven Print Design", value: 61 },
  { label: "Fashion", value: 62 },
  { label: "Children", value: 63 },
  { label: "Ladies", value: 64 },
  { label: "Men", value: 65 },
  { label: "Sports", value: 66 },
  { label: "Undergarment", value: 67 },
  { label: "Traditional", value: 68 },
  { label: "Accounting", value: 69 },
  { label: "Garments", value: 70 },
  { label: "Embroidery Design", value: 71 },
  { label: "T-shirt Prints", value: 72 },
  { label: "Others", value: 73 },
];

const JobType = ["Full Time", "Part Time"];

const Job = () => {
  const { getAllPosts } = useData();
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [signal, setSignal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [looking, setLooking] = useLocalStorageState("looking", "");
  const [search, setSearch] = useLocalStorageState("job_search", "");
  const [jobType, setJobType] = useLocalStorageState("job_type", []);
  const [sort, setSort] = useLocalStorageState("job_sort", "id desc");
  const [location, setLocation] = useLocalStorageState("job_location", "");
  const [categories, setcategories] = useLocalStorageState(
    "job_categories",
    [],
  );

  const handlecategories = (value) => {
    if (categories.includes(value)) {
      setcategories(categories.filter((i) => i !== value));
    } else {
      setcategories([...categories, value]);
    }
  };

  const handleJobType = (value) => {
    if (jobType.includes(value)) {
      setJobType(jobType.filter((i) => i !== value));
    } else {
      setJobType([...jobType, value]);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadJobs() {
      setLoading(true);

      const filters = ["status=1"];
      if (looking) filters.push(`looking_for='${looking}'`);
      if (location) filters.push(`job_location='${location}'`);

      if (jobType.length > 0) {
        filters.push(
          `job_type IN(${jobType.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      const result = await getAllPosts({
        type: "job",
        top: 9,
        search,
        orderby: sort,
        tagIds: categories,
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setJobs(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setJobs([]);
        setMeta(null);
      }

      setLoading(false);
    }
    loadJobs();
  }, [search, sort, location, jobType, looking, categories, getAllPosts]);

  const handlereset = () => {
    setSearch("");
    setJobType("");
    setLooking("");
    setLocation("");
    setcategories("");
    setSort("id desc");

    setSignal((n) => n + 1);
  };

  return (
    <div className=" bg-[#ECECEC] ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 h-auto">
        <div>
          <div className="bg-white p-4">
            <h2 className="text-sm font-semibold mb-3">CATEGORIES</h2>

            <div className="space-y-2 max-h-50 overflow-y-auto">
              {categoriesList.map((item) => (
                <label
                  key={item.value}
                  className="flex items-center max-w-lg gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={categories.includes(item.value)}
                    onChange={() => handlecategories(item.value)}
                    className="accent-green-500 w- h-4"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4">
            <h2 className="text-sm font-semibold mb-3">JOB TYPE</h2>
            <div className="space-y-2 max-h-50 overflow-y-auto">
              {JobType.map((item) => (
                <label
                  key={item}
                  className="flex items-center max-w-lg gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={jobType.includes(item)}
                    onChange={() => handleJobType(item)}
                    className="accent-green-500 w- h-4"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
            <div className="flex justify-between gap-10">
              <Navigation t2={"Job"} />
              <OriginDropdown
                value={location}
                onChange={setLocation}
                placeholder="Location"
              />
            </div>
            <div className="flex justify-between md:justify-end lg:justify-between gap-4">
              <ActionButton label={"Upload Job Offers"} href={""} />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-4 justify-between  mt-4">
              <div>
                <select
                  value={looking}
                  onChange={(e) => setLooking(e.target.value)}
                  className="w-full rounded-lg border text-sm border-gray-300 text-gray-500 bg-white px-4 py-2 text-sm focus:outline-none"
                >
                  <option value="" hidden disabled>
                    Looking for a
                  </option>
                  <option value="1">Designer</option>
                  <option value="2">Consultant</option>
                </select>
              </div>
              <Search
                resetSignal={signal}
                value={search}
                onSearch={setSearch}
              />
              <Reset onReset={handlereset} />
              <Sort sorted={sort} setSorted={setSort} />
            </div>
            <div className="py-10">
              <JobCard data={jobs} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
