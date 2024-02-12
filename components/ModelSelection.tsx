"use client";

import React from "react";
import Select from "react-select";
import useSWR from "swr";
import { OptionsOrGroups } from "react-select";

// Hardcoding text models for now.
const modelList: string[] = [
  "gpt-4-32k-0613",
  "gpt-4-32k",
  "gpt-4-0613",
  "gpt-4",
  "gpt-4-vision-preview",
  "gpt-4-1106-preview",
  "gpt-4-turbo-preview",
  "gpt-4-0125-preview",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-instruct",
];

type SelectOption = { label: string; value: string };

const modelOptions: OptionsOrGroups<any, any> | undefined = modelList.map(
  (model) => ({
    label: model,
    value: model,
  })
);

export default function ModelSelection() {
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });
  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={modelOptions}
        placeholder={"Please select a model."}
        isSearchable
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

// Not using this until I can figure out how to integrate model selection properly for different models with different arguments.
export function ModelSelectionOld() {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-4",
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOption}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}
