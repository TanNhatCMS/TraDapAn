export class Services {
    async fetchData(endpoint, method, data = null) {
        try {
            const res = await axios({
                url: `https://658bef26859b3491d3f51938.mockapi.io/${endpoint}`,
                method,
                data,
            });
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getDatas() {
        return this.fetchData('tradapan', 'GET');
    }

    async addData(data) {
        await this.fetchData('tradapan', 'POST', data);
    }

    async deleteData(id) {
        await this.fetchData(`tradapan/${id}`, 'DELETE');
    }

    async getDataById(id) {
        return this.fetchData(`tradapan/${id}`, 'GET');
    }

    async updateData(data) {
        await this.fetchData(`tradapan/${data.id}`, 'PUT', data);
    }
}
