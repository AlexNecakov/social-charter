# How to run locally:
1. `git clone <to wherever>`
2. `npm install`
3. (If auth is needed)
  - add auth token to `.env.local`
4. `npm run dev`
5. go to `http://localhost:3000`

# Notes
I couldn't get the TikTok endpoint to respond with data. 

I have everything in the frontend set up to use that data and try to send the request for it but never got a good response. 

No clue why haha.

# How I used AI 
Started off using create-t3-app to set up the project.

Then I fed the question in full into Grok and asked it to generate a response using Next and TRPC as I've set them up.

I used Grok to generate base code for all of the individual components and home page.

About this time, I ran out of free Grok tokens and switched to GPT 4o-mini.

I didn't have AI set up in my editor (NeoVim btw), so there was a lot of copy pasting into AI involved haha.
