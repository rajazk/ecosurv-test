import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import Select from "../Select";
import styles from "./dogBreedSelector.module.scss";
import Spinner from "../Spinner";
import {
  useGetBreedListQuery,
  useGetSubBreedListMutation,
} from "../../store/api";

interface Breeds {
  [breed: string]: string[];
}

const DogBreedSelector: React.FC = () => {
  const [breeds, setBreeds] = useState<Breeds>({});
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [selectedSubBreed, setSelectedSubBreed] = useState<string>("");
  const [imageCount, setImageCount] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const { data, isLoading } = useGetBreedListQuery({ skip: true });
  const [getSubBreed, { data: images, isLoading: isImageLoading }] =
    useGetSubBreedListMutation();

  useEffect(() => {
    if (data) {
      setBreeds(data);
    }
  }, [data]);

  const handleBreedSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value);
    setSubBreeds(breeds[e.target.value] || []);
    setSelectedSubBreed("");
  };

  const handleSubBreedSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubBreed(e.target.value);
  };

  const handleImageCountSelection = (e: ChangeEvent<HTMLInputElement>) => {
    setImageCount(parseInt(e.target.value));
  };

  const fetchImages = async () => {
    if (selectedBreed === "") {
      setError("Please select a breed.");
      return;
    }

    setError("");
    getSubBreed({ selectedBreed, selectedSubBreed, imageCount });
  };

  const breedOptions = useMemo(() => {
    return Object.keys(breeds).map((breed) => ({
      value: breed,
      label: breed,
    }));
  }, [breeds]);

  const subBreedOptions = useMemo(() => {
    return subBreeds.map((subBreed) => ({
      value: subBreed,
      label: subBreed,
    }));
  }, [subBreeds]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.card}>
        <div className={styles.menuWrapper}>
          <div className={styles.formGroup}>
            <h2>Breed:</h2>
            <Select
              options={[
                { value: "", label: "Choose a breed" },
                ...breedOptions,
              ]}
              value={selectedBreed}
              onChange={handleBreedSelection}
            />
          </div>
          {subBreeds.length > 0 && (
            <div className={styles.formGroup}>
              <h2>Sub-breed:</h2>
              <Select
                options={[
                  { value: "", label: "Choose a sub-breed" },
                  ...subBreedOptions,
                ]}
                value={selectedSubBreed}
                onChange={handleSubBreedSelection}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <h2>Number of images:</h2>
            <input
              type="number"
              value={imageCount}
              onChange={handleImageCountSelection}
              min="1"
            />
          </div>
          <button onClick={fetchImages}>View Images</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {isImageLoading ? (
          <Spinner />
        ) : (
          <div className={styles.imagesContainer}>
            {images &&
              images.map((image: any, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedBreed} ${selectedSubBreed}`}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DogBreedSelector;
