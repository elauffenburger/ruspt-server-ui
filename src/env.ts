interface Environment {
    rusptServerAddress: string;
}

const environment: Environment = {
    rusptServerAddress: process.env.VUE_APP_RUSPT_SERVER_ADDRESS,
};

console.log('env: %O', process.env);

export default environment;
