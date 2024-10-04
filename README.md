```bash
# Install JS dependencies
pnpm i

# Build WebAssembly
cd logic && wasm-pack build --target web

# Build and serve JS
pnpm parcel src/index.html

```


Now visit http://127.0.0.1:1234/ and click the button a few
times. After 5 clicks, the Rust / WebAssembly code will asynchronously
generate an event that gets fed back into Redux and the React view is
updated accordingly.

## Future ideas / work

I don't like that the event structure is defined in both the TS and
Rust code. I'd maybe try and pull that out to some data format that
generates Rust and TS code to ensure they are always in sync.

The Rust-side event needs to be a bit more generic so we get type
safety for lots of different kinds of `payload`s.

The WebAssembly code isn't automatically built on change like the rest
of the TS.

I don't like that the event emitter is from an `Option`, but I
couldn't quickly see how to return a tuple of `(Application, Events)`
via wasm-bindgen.

The Rust code should explore how some kind of background operation /
async task would work. (`wasm_bindgen_futures::spawn_local`?).

The codebase is quick-and-dirty and should have linting and
prettifying added.
