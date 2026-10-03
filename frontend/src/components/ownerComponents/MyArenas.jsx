import React from "react";
import AddArenaCard from "./AddArenaCard";
import ArenaCard from "./ArenaCard";

const MyArenas = ({ arenas = [], onAddArena ,onManage}) => {

  return (
    <section className="p-6">

      <h2 className="text-2xl font-bold">
        My Arenas
      </h2>


      {/* No arenas */}
      {arenas.length === 0 && (
        <div className="mt-6 max-w-sm">
          <AddArenaCard onClick={onAddArena} />
        </div>
      )}


      {/* Arenas exist */}
      {arenas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

          {arenas.map((arena) => (
            <ArenaCard
              key={arena._id}
              arena={arena}
              onManage={onManage}
            />
          ))}


          {/* Always allow adding another arena */}
          <AddArenaCard onClick={onAddArena}  />

        </div>
      )}

    </section>
  );
};

export default MyArenas;