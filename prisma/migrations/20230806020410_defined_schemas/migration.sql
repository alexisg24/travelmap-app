-- CreateTable
CREATE TABLE "Waypoint" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cords" TEXT NOT NULL,

    CONSTRAINT "Waypoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "waypoint1_id" INTEGER NOT NULL,
    "waypoint2_id" INTEGER NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "waypoint_id" INTEGER NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Waypoint" ADD CONSTRAINT "Waypoint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_waypoint1_id_fkey" FOREIGN KEY ("waypoint1_id") REFERENCES "Waypoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_waypoint2_id_fkey" FOREIGN KEY ("waypoint2_id") REFERENCES "Waypoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_waypoint_id_fkey" FOREIGN KEY ("waypoint_id") REFERENCES "Waypoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
