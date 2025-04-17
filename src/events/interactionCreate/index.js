import { Events } from "discord.js";
import { useAppStore } from "../../store/app";
import { async } from "fast-glob";

export const even = {
    name : Events.InteractionCreate,
    once :false,
};

export const action = async(interaction) =>{

    if(!interaction.isChatInputCommand())return
    const appStore = useAppStore()
    const action = appStore.commandsActionMap.get(interaction.commandName)

    await action(interaction)
}