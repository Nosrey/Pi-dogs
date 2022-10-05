import React, { useState } from "react";

export default function SearchBar() {
    const [breed, setBreed] = useState("");
    let onSearch = function(msg) {
        alert(msg);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch(breed);
            setBreed('');
        }}>
            <input
                type="text"
                placeholder="Razas..."
                value={breed}
                onChange={e => setBreed(e.target.value)}
            />
            <input type="submit" value="Buscar" />
        </form>
    );
}
