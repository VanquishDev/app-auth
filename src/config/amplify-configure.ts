"use client"; 

import { API, Auth, Storage } from "aws-amplify";
import { config } from "./amplify-config";

API.configure(config);
Auth.configure(config);
Storage.configure(config);