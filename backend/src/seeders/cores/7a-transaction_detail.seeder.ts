import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const transactions: any = await queryInterface.sequelize
            .query("SELECT id FROM transactions")
            .then((result) => result[0]);
        const products: Array<any> = await queryInterface.sequelize
            .query("SELECT id, name, price FROM products")
            .then((result) => result[0]);

        let transactionDetails: object[] = [];
        transactions.forEach((transaction: any) => {
            const startIndex = Math.floor(
                Math.random() * (products.length - 5)
            );
            const productChoosen = products
                .slice(startIndex, startIndex + 3)
                .map((product: any) => {
                    const quntity = Math.floor(Math.random() * 3) + 1;
                    return {
                        ...product,
                        quntity,
                    };
                });

            transactionDetails.push({
                id: uuidV4(),
                transactionId: transaction.id,
                products: JSON.stringify(productChoosen),
            });
        });
        await queryInterface.bulkInsert(
            "transaction_details",
            transactionDetails,
            {}
        );
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("transaction_details", {});
    },
};
