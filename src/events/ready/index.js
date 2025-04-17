import { Events } from "discord.js";

export const even = {
    name : Events.ClientReady,
    once :true,
};

export const action = (c) =>{
    console.log(`Ready! Logged in as ${c.user.tag}`);
}