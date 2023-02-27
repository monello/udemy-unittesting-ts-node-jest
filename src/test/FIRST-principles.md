## F.I.R.S.T Principles

### Fast:

-   Especially on large projects where the may be hundreds of tests.

### Independent:/Isolated

-   Isolated from other tests and also from any external environment
-   Shouldn't share stae with other unit tests
-   Tests should have their own set-up and teardown, where it makes sense

### Repeatable:

-   Same input should always result is the same output
-   When random or time based tests are required, these can be mocked
-   If a test has to write to a database, then clea-up needed to be done afterward (teardown)

### Self-validating:

-   The results should be clear: either pass or fail never both.

### Thorough:

-   Cover all cases, paths and scenarions (lines, functions classes, all sides of desicion structures)
-   Cover happy paths, bad paths and edge cases
-   Invalid input
-   Large values
-   This is where coverage helps you, BUT 100% code coverage not an indicator of throuroughness - it does accuratley tell you how many of the files being tracked are covered, how many of the lines in each of these files are covers, how many funstions in these files and if all bracnhes of decision structures are covered, it CANNOT tell you if you tested complicated scenarios, edge cases etc.
