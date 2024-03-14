-- CreateTable
CREATE TABLE "dBProperties" (
    "database_id" TEXT NOT NULL,
    "result" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dBProperties_pkey" PRIMARY KEY ("database_id")
);

-- CreateTable
CREATE TABLE "dBRows" (
    "params" TEXT NOT NULL,
    "database_id" TEXT NOT NULL,
    "result" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dBRows_pkey" PRIMARY KEY ("params")
);

-- CreateTable
CREATE TABLE "pageProperties" (
    "page_id" TEXT NOT NULL,
    "result" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pageProperties_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "blockChildren" (
    "block_id" TEXT NOT NULL,
    "result" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blockChildren_pkey" PRIMARY KEY ("block_id")
);
