const store = new Map();

export default function crates(name: string, crate: object): object;
export default function crates(name: string, crate: Function): Function;
export default function crates(name: string, crate: unknown[]): any;
export default function crates(name: string): any;
export default function crates(name: string, crate?: object | unknown[] | Function) {
    if (typeof name === "string") {
        if (typeof crate === "undefined") {
            if (!store.has(name)) throw new Error("Crate doesn't exist.");

            return store.get(name);
        }

        if (typeof crate === "object") {
            if (Array.isArray(crate)) {
                if (!store.has(name)) throw new Error("Crate doesn't exist");

                if (typeof store.get(name) !== "function") throw new Error("Crate isn't callable.");

                return store.get(name)(...crate);
            }

            if (store.has(name)) throw new Error("Crate already exists.");

            store.set(name, crate);

            return crate;
        }

        if (typeof crate === "function") {
            if (store.has(name)) throw new Error("Crate already exists.");

            store.set(name, crate);

            return crate;
        }
    }

    throw new Error("Crate name must be a string.");
}
