import { MigrationInterface, QueryRunner } from "typeorm";

export class default1692981127694 implements MigrationInterface {
    name = 'default1692981127694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cliente\` CHANGE \`cargo\` \`sexo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`sexo\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`sexo\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`sexo\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`sexo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` CHANGE \`sexo\` \`cargo\` varchar(255) NOT NULL`);
    }

}
