import { Collection, REST,Routes } from "discord.js"
import fg from 'fast-glob'
import { command } from "../commands/ping"
import { useAppStore } from "../store/app"

const updateSlashCommands =async(commands) => {
    const rest = new REST ({version:10}).setToken(process.env.TOKEN)
    const result = await rest.put(
        Routes.applicationGuildCommands(
            process.env.APPLICATION_ID,
            '1347882547438161991'
        ),
        {
            body: commands
        }
    )
}


export const loadCommands = async() => {
  const appStore = useAppStore()
  const commands = []
  const actions = new Collection()
  const files = await fg('./src/commands/**/index.js')
  for (const file of files){
    const cmd = await import (file)
    commands.push(cmd.command)
    actions.set(cmd.command.name,cmd.action)
  }

  await updateSlashCommands (commands)
  appStore.commandsActionMap = actions

  console.log (appStore.commandsActionMap)
}

export const loadEvents = async() => {
    const appStore = useAppStore()
    const client = appStore.client
    const files = await fg('./src/events/**/index.js')
    for (const file of files){
        const eventfile = await import (file)

        if (eventfile.even.once)
            client.once(
                eventfile.even.name ,
                eventfile.action
        )
        else{
            client.on(
                eventfile.even.name ,
                eventfile.action
            )
        }
    }
}


