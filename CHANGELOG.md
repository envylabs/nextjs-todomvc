# [0.2.0](https://github.com/envylabs/nextjs-todomvc/compare/v0.1.0...v0.2.0) (2022-03-05)


### Bug Fixes

* uses non-TLS endpoint for worldtimeapi ([8a00335](https://github.com/envylabs/nextjs-todomvc/commit/8a00335709e98bae16a758ef5f67166bb36a1351))


### Features

* add datetime attribute to CurrentTime tag ([b289aad](https://github.com/envylabs/nextjs-todomvc/commit/b289aad149e407146089ff14c6a6dc9b43e18ffe))
* extract DefaultProps ([0e48b7d](https://github.com/envylabs/nextjs-todomvc/commit/0e48b7d04d3fc251fd4f408f03c633d0873893ce))
* provde client- and server-side query pages ([79540af](https://github.com/envylabs/nextjs-todomvc/commit/79540af759391152dbd05fe66ca80268d29c1e09))



# [0.1.0](https://github.com/envylabs/nextjs-todomvc/compare/f783bfe9aa5931d37f866accc9c71a6cac0f7985...v0.1.0) (2022-03-04)


### Bug Fixes

* add spacing between locale selectors ([7acff20](https://github.com/envylabs/nextjs-todomvc/commit/7acff20a5189cfbfd5d3db385c4a1b11a09511b7))
* allow explicit null/undefined/empty strings as timezone arguments ([66c59d4](https://github.com/envylabs/nextjs-todomvc/commit/66c59d43a372beca9c5a8e7e78ea314112ec0439))
* correct active todo count ([f5d91ed](https://github.com/envylabs/nextjs-todomvc/commit/f5d91ed4b750bad8b1d7bb23396c37670f069e7d))
* correct deprecation warning about JSON import style ([c81f214](https://github.com/envylabs/nextjs-todomvc/commit/c81f214c0cc01b8aced7881498fae63ef47382b3))
* correctly reset todo title after editing and save on blur ([9396a3d](https://github.com/envylabs/nextjs-todomvc/commit/9396a3d2ab980e92acd2e110e6f6417f772b0e00))
* ensure new todo input is focused on load ([df66af6](https://github.com/envylabs/nextjs-todomvc/commit/df66af653108617e02f2c74865f9edd93ed814b7))
* relocate layout page content to correct location ([fe79280](https://github.com/envylabs/nextjs-todomvc/commit/fe79280d09f5346e4cfc71531c343b5f01237d0f))
* remove errant semicolon ([995c4db](https://github.com/envylabs/nextjs-todomvc/commit/995c4dbe4e41ad4b773a172abe4d742b412f0a38))
* remove unnecessary activeFilter typings ([20e8e86](https://github.com/envylabs/nextjs-todomvc/commit/20e8e860f2221e42ef04477200d5a2df82e0ac32))
* use correct href ([2278d31](https://github.com/envylabs/nextjs-todomvc/commit/2278d317c42e7f4bbb23947dd7c43f00af15c7b9))
* use double-quotes for JSON files ([5a5bf5d](https://github.com/envylabs/nextjs-todomvc/commit/5a5bf5d8961add4e3ae452aa259bae90851cc459))


### Features

* add a current-time API endpoint ([46355db](https://github.com/envylabs/nextjs-todomvc/commit/46355db455e9bcbbd0541e4a3f3a77002540bb4f))
* add a CurrentTime display to the footer ([16e8df7](https://github.com/envylabs/nextjs-todomvc/commit/16e8df77b4af7429a7f3488cd89a52e4ef944eaa))
* add a Store model ([c05ed39](https://github.com/envylabs/nextjs-todomvc/commit/c05ed39a70c9dafc4b8c9a33c8348b43e5d67c0c))
* add a StoreContext for the application ([21cc70a](https://github.com/envylabs/nextjs-todomvc/commit/21cc70afb82bfafef2705ab2c54eae441c875544))
* add a Todo model ([b35c254](https://github.com/envylabs/nextjs-todomvc/commit/b35c254b120f9e62f7e4867fb52ed9b77e01fe54))
* add an aria-label to the todo edit input ([6dce68f](https://github.com/envylabs/nextjs-todomvc/commit/6dce68f837e0c8205c6ca4f010ec11a28f8a25c0))
* add API request timeout ([08e71e4](https://github.com/envylabs/nextjs-todomvc/commit/08e71e474fcbdf857df60c47716dc2e2df63bf36))
* add aria labels for complete and remove interactions ([db15996](https://github.com/envylabs/nextjs-todomvc/commit/db15996e5c16e676237b0e5a46de9275890284d8))
* add hreflang, lang, and rel attributes to locale links ([0441f2b](https://github.com/envylabs/nextjs-todomvc/commit/0441f2bb82c090b9085dd08928b0cacdb5ae61fc))
* add initial TodoMVC layout and CSS ([f783bfe](https://github.com/envylabs/nextjs-todomvc/commit/f783bfe9aa5931d37f866accc9c71a6cac0f7985))
* add pretty io-ts reporting to failures ([09ba05c](https://github.com/envylabs/nextjs-todomvc/commit/09ba05c89434eeb23287fe221531096ec3a6ed3a))
* add Spanish translations ([cc893b0](https://github.com/envylabs/nextjs-todomvc/commit/cc893b0d46de4d9bf75a12cbc5b4ec46a1c06493))
* autofocus the todo editor ([d8254af](https://github.com/envylabs/nextjs-todomvc/commit/d8254af183cfebb5a9fcbaa76a64013a7fda5022))
* collect and persist new Todos ([8375f7d](https://github.com/envylabs/nextjs-todomvc/commit/8375f7d98db5c1f47eba70c055df10753c774115))
* delete a todo when the title is cleared ([50ed135](https://github.com/envylabs/nextjs-todomvc/commit/50ed1352ca6c70417d645f9b7ef1338cc0b8402a))
* ESCAPE reverts active edits ([bc0a0cb](https://github.com/envylabs/nextjs-todomvc/commit/bc0a0cb5e5afd84e46d66a5bce32cb28a1fc87e7))
* fill out /api/current-time endpoint behavior ([12da047](https://github.com/envylabs/nextjs-todomvc/commit/12da04795dfd5c73c1ee947d327d72367eb9bf78))
* move Todo creation into Store ([459cc53](https://github.com/envylabs/nextjs-todomvc/commit/459cc53fd344fdf59a183ceb3b4d53a975cb5f5d))
* move Todo creation into Store and add identifiers ([216898c](https://github.com/envylabs/nextjs-todomvc/commit/216898cf7dce7a6487a41b4230a0753ca27dc4ef))
* remove generated Next.js index content and styles ([50aed44](https://github.com/envylabs/nextjs-todomvc/commit/50aed44c9f99de48b194f72d7189b77cacb088d8))
* replace fetch with axios ([6d164b2](https://github.com/envylabs/nextjs-todomvc/commit/6d164b26fc0278cc7167197d156003bb6495ac08))
* set the static title in the layout ([9836556](https://github.com/envylabs/nextjs-todomvc/commit/9836556fdca4962c45d12e47eaeea937c1fa671d))
* switch to immutable state ([8a10a50](https://github.com/envylabs/nextjs-todomvc/commit/8a10a5032759c8ce1ecae09d600c351d22e007b8))


### Reverts

* Remove jest and testing-library ([a27596b](https://github.com/envylabs/nextjs-todomvc/commit/a27596b41ac26b1a7bd8d457a48f73be3096c86a))



