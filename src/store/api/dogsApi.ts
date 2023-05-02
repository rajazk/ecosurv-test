import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery: customFetchBase,
  tagTypes: ["Dogs"],

  endpoints: (builder) => ({
    getBreedList: builder.query({
      query: () => `breeds/list/all`,
      transformResponse: (response: any) => response.message,
    }),

    getSubBreedList: builder.mutation({
      query: ({ selectedBreed, selectedSubBreed, imageCount }) => {
        return selectedSubBreed
          ? `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images/random/${
              imageCount ? imageCount : 1
            }`
          : `https://dog.ceo/api/breed/${selectedBreed}/images/random/${
              imageCount ? imageCount : 1
            }`;
      },
      transformResponse: (response: any) => response.message,
    }),
  }),
});

export const { useGetBreedListQuery, useGetSubBreedListMutation } = dogsApi;
