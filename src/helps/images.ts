// types
import { StylesMotorcycleType } from "../providers/MotorcyclesProvider/MotorcyclesProvider.types";

// images
import prototypeImage from "../../assets/images/Prototype.jpeg";
import sportImage from "../../assets/images/sport.jpeg";
import undefineImage from "../../assets/images/undefine.jpeg";
import scooterImage from "../../assets/images/Scooter.jpeg";
import ATVImage from "../../assets/images/ATV.jpeg";
import allRoundImage from "../../assets/images/Allround.jpeg";
import nakedImage from "../../assets/images/Naked.jpeg";
import cruiserImage from "../../assets/images/cruiser.jpeg";
import motocrossImage from "../../assets/images/motocross.jpeg";
import motardImage from "../../assets/images/motard.jpeg";
import minibikeSportImage from "../../assets/images/minibikeSport.jpeg";
import minibikeCrossImage from "../../assets/images/minibikeCross.jpeg";
import classicImage from "../../assets/images/Classic.jpeg";
import touringImage from "../../assets/images/Touring.jpeg";
import enduroImage from "../../assets/images/Enduro.jpeg";
import trialImage from "../../assets/images/Trial.jpeg";
import unspecifiedImage from "../../assets/images/Unspecified.jpeg";
import sportTouring from "../../assets/images/sportTouring.jpeg";
import speedwayTouring from "../../assets/images/Speedway.jpeg";

/* 
"Speedway" */
export const getImageTypeMoto = (category: StylesMotorcycleType) => {
  if (category === "Prototype / concept model") return prototypeImage;
  if (category === "Sport") return sportImage;
  if (category === "Scooter") return scooterImage;
  if (category === "ATV") return ATVImage;
  if (category === "Allround") return allRoundImage;
  if (category === "Naked bike") return nakedImage;
  if (category === "Custom / cruiser") return cruiserImage;
  if (category === "Cross / motocross") return motocrossImage;
  if (category === "Super motard") return motardImage;
  if (category === "Minibike, sport") return minibikeSportImage;
  if (category === "Minibike, cross") return minibikeCrossImage;
  if (category === "Classic") return classicImage;
  if (category === "Touring") return touringImage;
  if (category === "Enduro / offroad") return enduroImage;
  if (category === "Trial") return trialImage;
  if (category === "Unspecified category") return unspecifiedImage;
  if (category === "Sport touring") return sportTouring;
  if (category === "Speedway") return speedwayTouring;

  return undefineImage;
};
