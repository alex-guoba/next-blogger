import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client#the-number-of-prismaclient-instances-matters
let prisma = new PrismaClient()

export default prisma