import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");
    const privilege_groups = [
        {
            name: "user_managment"
        },
        {
            name: "role_managment"
        }];

    for (const p of privilege_groups) {
        const privilege_group = await prisma.privilegeGroup.create({
            data: p,
        });
        console.log(`Created privilege_group with id: ${privilege_group.id}`);
    }

    const privileges = [
        {
            name: "create_user",
            type: "create",
            description: "Can create a new user",
            privilege_group_id: 1
        },
        {
            name: "update_user",
            type: "update",
            description: "Can update a user",
            privilege_group_id: 1
        },
        {
            name: "delete_user",
            type: "delete",
            description: "Can delete a user",
            privilege_group_id: 1
        },
        {
            name: "view_user",
            type: "view",
            description: "Can view a user",
            privilege_group_id: 1
        },
        {
            name: "create_role",
            type: "create",
            description: "Can create a new role",
            privilege_group_id: 2
        },
        {
            name: "update_role",
            type: "update",
            description: "Can update a role",
            privilege_group_id: 2
        },
        {
            name: "delete_role",
            type: "delete",
            description: "Can delete a role",
            privilege_group_id: 2
        },
        {
            name: "view_role",
            type: "view",
            description: "Can view a role",
            privilege_group_id: 2
        }
    ];

    for (const p of privileges) {
        const privilege = await prisma.privilege.create({
            data: p,
        });
        console.log(`Created privilege with id: ${privilege.id}`);
    }

    const roles = [
        {
            name: "global_admin",
            blocked: false
        },
        {
            name: "organization_admin",
            blocked: false
        },
        {
            name: "organization_unit_admin",
            blocked: false
        },
        {
            name: "location_admin",
            blocked: false
        },
        {
            name: "user",
            blocked: false
        }
    ];

    for (const r of roles) {
        const role = await prisma.role.create({
            data: r,
        });
        console.log(`Created role with id: ${role.id}`);
    }

    const role_privileges1 = [
        {
            role_id: 1,
            privilege_id: 1
        },
        {
            role_id: 1,
            privilege_id: 2
        },
        {
            role_id: 1,
            privilege_id: 3
        },
        {
            role_id: 1,
            privilege_id: 4
        },
        {
            role_id: 1,
            privilege_id: 5
        },
        {
            role_id: 1,
            privilege_id: 6
        },
        {
            role_id: 1,
            privilege_id: 7
        },
        {
            role_id: 1,
            privilege_id: 8
        },
    ];

    const role_privileges2 = [
        {
            role_id: 2,
            privilege_id: 1
        },
        {
            role_id: 2,
            privilege_id: 2
        },
        {
            role_id: 2,
            privilege_id: 4
        },
        {
            role_id: 2,
            privilege_id: 5
        },
        {
            role_id: 2,
            privilege_id: 8
        },
    ];

    const role_privileges3 = [
        {
            role_id: 3,
            privilege_id: 1
        },
        {
            role_id: 3,
            privilege_id: 4
        },
        {
            role_id: 3,
            privilege_id: 5
        },
        {
            role_id: 3,
            privilege_id: 8
        },
    ];

    const role_privileges4 = [
        {
            role_id: 4,
            privilege_id: 1
        },
        {
            role_id: 4,
            privilege_id: 4
        },
        {
            role_id: 4,
            privilege_id: 8
        },
    ];

    const role_privileges5 = [
        {
            role_id: 5,
            privilege_id: 4
        }
    ];

    const role_privileges = [
        ...role_privileges1,
        ...role_privileges2,
        ...role_privileges3,
        ...role_privileges4,
        ...role_privileges5
    ];

    for (const rp of role_privileges) {
        const role_privilege = await prisma.rolePrivilege.create({
            data: rp,
        });
        console.log(`Created role_privilege with id: ${role_privilege.id}`);
    }

    const users = [
        {
            first_name: "John",
            last_name: "Doe",
            email: "j.doe@test.com",
            phone: "1234567890",
            status: "active",
            type: "global"
        },
        {
            first_name: "Jane",
            last_name: "Smith",
            email: "j.smith@test.com",
            phone: "0987654321",
            status: "active",
            type: "organization"
        },
        {
            first_name: "Tom",
            last_name: "Brown",
            email: "t.brown@tst.com",
            phone: "1231231234",
            status: "active",
            type: "organization_unit"
        },
        {
            first_name: "Alice",
            last_name: "Green",
            email: "a.green@test.com",
            phone: "4564564567",
            status: "active",
            type: "location"
        },
        {
            first_name: "Bob",
            last_name: "White",
            email: "b.white@test.com",
            phone: "7897897890",
            status: "blocked",
            type: "user"
        }
    ];

    for (const u of users) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }

    const user_roles = [
        {
            user_id: 1,
            role_id: 1
        },
        {
            user_id: 2,
            role_id: 2
        },
        {
            user_id: 3,
            role_id: 3
        },
        {
            user_id: 4,
            role_id: 4
        },
        {
            user_id: 5,
            role_id: 5
        }
    ];

    for (const ur of user_roles) {
        const user_role = await prisma.userRole.create({
            data: ur,
        });
        console.log(`Created user_role with id: ${user_role.id}`);
    }

    console.log("Seeding completed!");
}

main()
    .then(() => {
        console.log("Seeding completed!");
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });