import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/hubs/chart') //match your backend route
    .build();

export default connection;