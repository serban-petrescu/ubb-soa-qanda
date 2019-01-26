import storage from "./storage";

export default function logout(){
    storage.clear();
    window.location.assign("#/");
}