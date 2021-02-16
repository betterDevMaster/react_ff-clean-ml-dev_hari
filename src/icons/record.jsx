import { Icon } from "@chakra-ui/react";
import React from "react";

const Record = (props) => (
  <Icon
    fill="currentcolor"
    viewBox="0 0 59 63"
    height={{base:'32px', xl:'38px', '2xl':'59px'}}
    width={{base:'30px', xl:'38px', '2xl':'59px'}}
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M0 29.646C0 45.9038 13.2422 59.146 29.5 59.146C45.7578 59.146 59 45.9038 59 29.646C59 13.3882 45.7578 0.145996 29.5 0.145996C13.2422 0.145996 0 13.3882 0 29.646ZM5.24444 29.646C5.24444 16.2727 16.1267 5.39044 29.5 5.39044C42.8733 5.39044 53.7556 16.2727 53.7556 29.646C53.7556 43.0193 42.8733 53.9016 29.5 53.9016C16.1267 53.9016 5.24444 43.0193 5.24444 29.646Z" fill="black" fillOpacity="0.85"/>
    <circle cx="29.5" cy="29.646" r="13.1111" fill="#6DD400"/>
  </Icon>
);

export default Record;