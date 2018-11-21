interface Environment {
    rusptServerAddress: string;
}

const environment: Environment = {
    rusptServerAddress: process.env.VUE_APP_RUSPT_SERVER_ADDRESS,
};

export default environment;