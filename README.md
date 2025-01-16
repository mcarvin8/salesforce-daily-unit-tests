Fork of the original [salesforce-daily-unit-tests](https://github.com/pgonzaleznetwork/salesforce-daily-unit-tests) from [Pablo Gonzalez](https://github.com/pgonzaleznetwork).

Updates from the original:
- Add GitLab CI/CD config file.
- Add [apex-code-coverage-transformer](https://github.com/mcarvin8/apex-code-coverage-transformer) plugin with SonarQube job.
    - This plugin also creates coverage reports in Cobertura, LCovOnly, and Clover format. The `.apexcodecovtransformer.config.json` file can be updated to create code coverage reports in those formats depending on what tool you are using for code quality.
- Only post the test result summary instead of all failing tests. This exceeds the slack payload limit in larger orgs.
