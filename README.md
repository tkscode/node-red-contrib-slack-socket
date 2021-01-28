# node-red-contrib-slack-socket

A Node-RED node to interact with the Slack Socket Mode.

## Requirements

+ Node-RED v1.X
+ Generate Slack app-level token
    + Read official document - https://api.slack.com/apis/connections/socket

## Install

Run the command in the root directory of Node-RED
```
npm install --save node-red-contrib-slack-socket
```

## Usage

### `Slack Listen` node

The `Slack Listen` node listens [Slack events](https://api.slack.com/events).  
Note: Slack Socket Mode accepts "Events API" events.

Example output:
```json
{
    "payload": {
        "client_msg_id": "...",
        "type": "app_mention",
        "text": "...", 
        "user": "...",
        "ts": "1611812562.007700",
        "team": "...",
        "blocks": [
            {
                "type":" rich_text",
                "block_id": "...",
                "elements": [
                    {
                        "type": "rich_text_section",
                        "elements": [
                            {"type": "user", "user_id": "..."},
                            {"type": "text", "text": "..."}
                        ]
                    }
                ]
            }
        ],
        "thread_ts": "1611123575.001100",
        "parent_user_id": "...",
        "channel":"...",
        "event_ts":"1611812562.007700"
    }
}
```

## Developers

### dev-Requirements

+ Node v12 LTS and higher
+ Docker 20.10 and higher
+ docker-compose 1.27 and higher

### Setup

1. Create `test/mocha.env.js` file
    ```js
    process.env.SLACK_APP_TOKEN = 'xapp-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    ```
1. Create `.env` file
    ```bash
    SLACK_APP_TOKEN=xapp-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    ```

### Test

1. Edit `test/*_spec.js` test files

1. Execute `npm` command
    ```bash
    $ npm run test
    ```

### Run on Node-RED

1. Build Docker container image
    ```bash
    $ docker-compose build
    ```
1. Run container
    ```bash
    $ docker-compose up -d
    ```
1. Stop container
    ```bash
    $ docker-compose stop
    ```
