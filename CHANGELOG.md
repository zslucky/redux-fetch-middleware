# redux-fetch-middleware Change Log
All notable changes to this project will be documented in this file.
This project adheres to SamVer 2.0. ([Semantic Versioning](http://semver.org/)).
## 3.0.0 - 2017-01-20

- Replace `$props` to `meta`.
- Move `$uid` into `meta` (`meta.$uid`).
- Append uuid package to use generate function uid (https://www.npmjs.com/package/uuid).
- Add `$payload.responseType` to select parse response method.
- Add `$payload.onResponse` to react on response event.
- Add `meta.$response` to transition response to reducer.

## 2.1.0 - 2017-01-14

- Add `$uid` to make every request unique.

## 2.0.4 - 2016-12-28

- Add `$props` to transition data from action to reducer.

## 2.0.0 - 2016-10-24

- Fix request options doesn't re-write from before request issue.
- Add freelint instead of eslint and jscs.
- Add yarn support.
- Add SemVer2.0 support.
- Add Change log.
