import vuelnit from '@/core/vue'
import { Client, Events, GatewayIntentBits }from 'discord.js';
import  dotenv  from 'dotenv';
import { useAppStore } from './store/app';

import { loadCommands,loadEvents } from '@/core/loader';

vuelnit()
dotenv.config()
loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore()
appStore.client = client

loadEvents()

client.login(process.env.TOKEN);