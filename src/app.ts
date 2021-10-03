import TelegramBot from "node-telegram-bot-api";
import { config }  from 'dotenv';
import { match } from "assert";

enum location { 
  OUTSIDE = "outside",
  DECK ="deck_",
  BASEMENT = "basement",
  CLUBHOUSE = "clubhouse",
  DUNNO_MERCS = "dunno where mercs is",
  DUNNO_KODIAQ = "dunno where kodiaq is"
}

config();
const API_TOKEN = process.env.BOT_TOKEN || "";
// console.log(API_TOKEN);
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(API_TOKEN, {polling: true});

let KODIAQ = location.DUNNO_KODIAQ + "";
let MERC = location.DUNNO_MERCS + "";

bot.onText(/\/merc (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  if (match == null) {

  } else {
    const resp = match[1]; // the captured "whatever"
    MERC = setCarpark(resp);
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, "mercs parked at: "  + MERC);
  }
});
bot.onText(/\/w_merc/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, MERC);
})
bot.onText(/\/w_kodiaq/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, KODIAQ);
});

bot.onText(/\/kodiaq (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  if (match == null) {
    
  } else {

  
    const resp = match[1]; // the captured "whatever"
    KODIAQ = setCarpark(resp);



    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, "kodiaq parked at: " + KODIAQ);
  }
});

// Matches /echo [whatever]
bot.onText(/\/reset/, (msg, match) => {
  const chatId = msg.chat.id;
  KODIAQ = location.DUNNO_KODIAQ + "";
  MERC = location.DUNNO_MERCS + "";
  bot.sendMessage(chatId, "Locations resetted!")
});



function setCarpark(resp: string) : string {
   if (resp.match(/^[1-9]\d*$/)) {
    //is deck 
    return location.DECK + resp;
  } else if (resp.match(/(?:[\s]|^)(basement|clubhouse|outside)(?=[\s]|$)/)) {
    switch(resp) {
      case "basement":
        return location.BASEMENT;
      case "clubhouse":
        return location.CLUBHOUSE;
      case "outside":
        return location.OUTSIDE;
      default:
        return resp;
        break;
    } 
  } 
  return resp;
}


