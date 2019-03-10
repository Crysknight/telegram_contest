export default class Data {
    static async get() {
        let data;
        if (IS_DEVELOPMENT) {
            data = await this.getDevelopmentData();
        } else {
            data = await this.getProductionData();
        }

        return data;
    }

    static async getDevelopmentData() {
        let response;
        try {
            response = await axios.get('/api/data');
        } catch (error) {
            console.warn('an error occured while fetching data:', error);
            response = {
                data: { charts: [] }
            };
        }

        return response.data;
    }

    static async getProductionData() {
        // here be production data
        return { charts: [] };
    }
};
