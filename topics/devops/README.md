# DevOps

## Questions

### General 

<details>
<summary>What is DevOps?</summary><br><b>

The definition of DevOps from selected companies:

**Amazon**:

"DevOps is the combination of cultural philosophies, practices, and tools that increases an organization’s ability to deliver applications and services at high velocity: evolving and improving products at a faster pace than organizations using traditional software development and infrastructure management processes. This speed enables organizations to better serve their customers and compete more effectively in the market."

**Microsoft**:

"DevOps is the union of people, process, and products to enable continuous delivery of value to our end users. The contraction of “Dev” and “Ops” refers to replacing siloed Development and Operations to create multidisciplinary teams that now work together with shared and efficient practices and tools. Essential DevOps practices include agile planning, continuous integration, continuous delivery, and monitoring of applications."

**Red Hat**:

"DevOps describes approaches to speeding up the processes by which an idea (like a new software feature, a request for enhancement, or a bug fix) goes from development to deployment in a production environment where it can provide value to the user. These approaches require that development teams and operations teams communicate frequently and approach their work with empathy for their teammates. Scalability and flexible provisioning are also necessary. With DevOps, those that need power the most, get it—through self service and automation. Developers, usually coding in a standard development environment, work closely with IT operations to speed software builds, tests, and releases—without sacrificing reliability."

**Google**:

"...The organizational and cultural movement that aims to increase software delivery velocity, improve service reliability, and build shared ownership among software stakeholders"
</b></details>

<details>
<summary>What are the benefits of DevOps? What can it help us to achieve?</summary><br><b>

DevOps brings measurable improvements across the entire software delivery lifecycle:

**Speed and Throughput**
- Faster time-to-market: automate builds, tests, and deployments to ship features in hours instead of weeks
- Increased deployment frequency: teams practicing DevOps deploy multiple times per day (vs. quarterly releases)
- [DORA research](https://cloud.google.com/devops): Elite performers deploy 208× more frequently than low performers

**Quality and Reliability**
- Fewer failures: automated testing and CI/CD catch bugs before they reach production
- Faster recovery: mean time to recovery (MTTR) drops from days to minutes with good monitoring and rollback practices
- Change failure rate: elite DevOps teams have change failure rates of 0–15% (vs. 45%+ for low performers)

**Collaboration and Culture**
- No more "it works on my machine" — shared responsibility from dev to production
- Breaking down silos: developers understand operations pain; ops understands developer velocity needs
- Psychological safety: blameless postmortems encourage honest learning from failures

**Business Outcomes**
- Better employee retention (high-trust culture)
- Faster feedback loops → build what customers actually want
- Reduced cost per deployment through automation
</b></details>



<details>
<summary>What are the anti-patterns of DevOps?</summary><br><b>

A couple of examples:

* One person is in charge of specific tasks. For example there is only one person who is allowed to merge the code of everyone else into the repository.
* Treating production differently from development environment. For example, not implementing security in development environment
* Not allowing someone to push to production on Friday ;)
</b></details>

<details>
<summary>How would you describe a successful DevOps engineer or a team?</summary><br><b>

The answer can focus on:

* Collaboration
* Communication
* Set up and improve workflows and processes (related to testing, delivery, ...)
* Dealing with issues

Things to think about:

* What DevOps teams or engineers should NOT focus on or do?
* Do DevOps teams or engineers have to be innovative or practice innovation as part of their role?
</b></details>

<details>
<summary>One of your team members suggests to set a goal of "deploying at least 20 times a day" in regards to CD. What is your take on that?</summary><br><b>

A couple of thoughts:

1. Why is it an important goal? Is it affecting the business somehow? One of the KPIs? In other words, does it matters?
2. This might introduce risks such as losing quality in favor of quantity
3. You might want to set a possibly better goal such as "be able to deploy whenever we need to deploy"
</b></details>

### Tooling

<details>
<summary>What do you take into consideration when choosing a tool/technology?</summary><br><b>

A few ideas to think about:

  * mature/stable vs. cutting edge
  * community size
  * architecture aspects - agent vs. agentless, master vs. masterless, etc.
  * learning curve
</b></details>

<details>
<summary>Can you describe which tool or platform you chose to use in some of the following areas and how?

  * CI/CD
  * Provisioning infrastructure
  * Configuration Management
  * Monitoring & alerting
  * Logging
  * Code review
  * Code coverage
  * Issue Tracking
  * Containers and Containers Orchestration
  * Tests</summary><br><b>

This is a more practical version of the previous question where you might be asked additional specific questions on the technology you chose

  * CI/CD - Jenkins, Circle CI, Travis, Drone, Argo CD, Zuul
  * Provisioning infrastructure - Terraform, CloudFormation
  * Configuration Management - Ansible, Puppet, Chef
  * Monitoring & alerting - Prometheus, Nagios
  * Logging - Logstash, Graylog, Fluentd
  * Code review - Gerrit, Review Board
  * Code coverage - Cobertura, Clover, JaCoCo
  * Issue tracking - Jira, Bugzilla
  * Containers and Containers Orchestration - Docker, Podman, Kubernetes, Nomad
  * Tests - Robot, Serenity, Gauge
</b></details>

<details>
<summary>A team member of yours, suggests to replace the current CI/CD platform used by the organization with a new one. How would you reply?</summary><br><b>

Things to think about:

* What we gain from doing so? Are there new features in the new platform? Does the new platform deals with some of the limitations presented in the current platform?
* What this suggestion is based on? In other words, did he/she tried out the new platform? Was there extensive technical research?
* What does the switch from one platform to another will require from the organization? For example, training users who use the platform? How much time the team has to invest in such move?
</b></details>

### Version Control

<details>
<summary>What is Version Control?</summary><br><b>
	
* Version control is the system of tracking and managing changes to software code.
* It helps software teams to manage changes to source code over time.
* Version control also helps developers move faster and allows software teams to preserve efficiency and agility as the team scales to include more developers.
</b></details>

<details>
<summary>What is a commit?</summary><br><b>
	
* In Git, a commit is a snapshot of your repo at a specific point in time.
* The git commit command will save all staged changes, along with a brief description from the user, in a “commit” to the local repository.
</b></details>

<details>
<summary>What is a merge?</summary><br><b>

* Merging is Git's way of putting a forked history back together again. The git merge command lets you take the independent lines of development created by git branch and integrate them into a single branch.
</b></details>

<details>
<summary>What is a merge conflict?</summary><br><b>

* A merge conflict is an event that occurs when Git is unable to automatically resolve differences in code between two commits. When all the changes in the code occur on different lines or in different files, Git will successfully merge commits without your help.
</b></details>

<details>
<summary>What best practices are you familiar with regarding version control?</summary><br><b>
	
* Use a descriptive commit message
* Make each commit a logical unit
* Incorporate others' changes frequently
* Share your changes frequently
* Coordinate with your co-workers
* Don't commit generated files
* Don't commit binary files
</b></details>

<details>
<summary>Would you prefer a "configuration->deployment" model or "deployment->configuration"? Why?</summary><br><b>

Both have advantages and disadvantages.
With "configuration->deployment" model for example, where you build one image to be used by multiple deployments, there is less chance of deployments being different from one another, so it has a clear advantage of a consistent environment.
</b></details>

<details>
<summary>Explain mutable vs. immutable infrastructure</summary><br><b>

In mutable infrastructure paradigm, changes are applied on top of the existing infrastructure and over time
the infrastructure builds up a history of changes. Ansible, Puppet and Chef are examples of tools which
follow mutable infrastructure paradigm.

In immutable infrastructure paradigm, every change is actually a new infrastructure. So a change
to a server will result in a new server instead of updating it. Terraform is an example of technology
which follows the immutable infrastructure paradigm.
</b></details>

### Software Distribution

<details>
<summary>Explain "Software Distribution"</summary><br><b>

Read [this](https://venam.nixers.net/blog/unix/2020/03/29/distro-pkgs.html) fantastic article on the topic.

From the article: "Thus, software distribution is about the mechanism and the community that takes the burden and decisions to build an assemblage of coherent software that can be shipped."
</b></details>

<details>
<summary>Why are there multiple software distributions? What differences they can have?</summary><br><b>

Different distributions can focus on different things like: focus on different environments (server vs. mobile vs. desktop), support specific hardware, specialize in different domains (security, multimedia, ...), etc. Basically, different aspects of the software and what it supports, get different priority in each distribution.
</b></details>

<details>
<summary>What is a Software Repository?</summary><br><b>

Wikipedia: "A software repository, or “repo” for short, is a storage location for software packages. Often a table of contents is stored, as well as metadata."

Read more [here](https://en.wikipedia.org/wiki/Software_repository)
</b></details>

<details>
<summary>What ways are there to distribute software? What are the advantages and disadvantages of each method?</summary><br><b>

  * Source - Maintain build script within version control system so that user can build your app after cloning repository. Advantage: User can quickly checkout different versions of application. Disadvantage: requires build tools installed on users machine.
  * Archive - collect all your app files into one archive (e.g. tar) and deliver it to the user. Advantage: User gets everything he needs in one file. Disadvantage: Requires repeating the same procedure when updating, not good if there are a lot of dependencies.
  * Package - depends on the OS, you can use your OS package format (e.g. in RHEL/Fefodra it's RPM) to deliver your software with a way to install, uninstall and update it using the standard packager commands. Advantages: Package manager takes care of support for installation, uninstallation, updating and dependency management. Disadvantage: Requires managing package repository.
  * Images - Either VM or container images where your package is included with everything it needs in order to run successfully. Advantage: everything is preinstalled, it has high degree of environment isolation. Disadvantage: Requires knowledge of building and optimizing images.
</b></details>

<details>
<summary>Are you familiar with "The Cathedral and the Bazaar models"? Explain each of the models</summary><br><b>

* Cathedral - source code released when software is released
* Bazaar - source code is always available publicly (e.g. Linux Kernel)
</b></details>

<details>
<summary>What is caching? How does it work? Why is it important?</summary><br><b>

Caching is fast access to frequently used resources which are computationally expensive or IO intensive and do not change often. There can be several layers of cache that can start from CPU caches to distributed cache systems. Common ones are in memory caching and distributed caching. <br/> Caches are typically data structures that contains some data, such as a hashtable or dictionary. However, any data structure can provide caching capabilities, like set, sorted set, sorted dictionary etc. While, caching is used in many applications, they can create subtle bugs if not implemented correctly or used correctly. For example,cache invalidation, expiration or updating is usually quite challenging and hard.
</b></details>

<details>
<summary>Explain stateless vs. stateful</summary><br><b>

Stateless applications don't store any data in the host which makes it ideal for horizontal scaling and microservices.
Stateful applications depend on the storage to save state and data, typically databases are stateful applications.
</b></details>

<details>
<summary>What is Reliability? How does it fit DevOps?</summary><br><b>

Reliability, when used in DevOps context, is the ability of a system to recover from infrastructure failure or disruption. Part of it is also being able to scale based on your organization or team demands.
</b></details>

<details>
<summary>What does "Availability" mean? What means are there to track Availability of a service?</summary><br><b>

Availability measures the proportion of time a service is operational and accessible. It's typically expressed as a percentage:

```
Availability = (Total Time - Downtime) / Total Time × 100%
```

**Common availability targets (known as "the nines"):**

| Nines | Availability | Downtime/Year | Typical Use |
|-------|-------------|---------------|-------------|
| 99% (two 9s) | 2 nines | 3.65 days | Internal tools |
| 99.9% (three 9s) | 3 nines | 8.76 hours | SaaS, internal APIs |
| 99.95% (three and a half) | 3.5 nines | 4.38 hours | Critical APIs |
| 99.99% (four 9s) | 4 nines | 52.6 minutes | Payment systems |
| 99.999% (five 9s) | 5 nines | 5.26 minutes | Telecom, life-critical |

**How to track availability:**
- **SLI (Service Level Indicator)** — The actual measurement (e.g., error rate, latency, uptime). Example: "99.95% of requests returned 200 OK in the last 30 days"
- **SLO (Service Level Objective)** — The target: "99.9% availability over a rolling 30-day window"
- **SLA (Service Level Agreement)** — The business contract: what happens if we miss the SLO (refunds, credits)

**Monitoring tools:** Prometheus + Alertmanager, Datadog, New Relic, Grafana, CloudWatch, PagerDuty for alerting. Probes (HTTP health checks, TCP checks) run at regular intervals — typically every 10–60 seconds.
</b></details>

<details>
<summary>Why isn't 100% availability a target? Why do most companies or teams set it to be 99%.X?</summary><br><b>

Pursuing 100% availability is both technically impossible and economically impractical:

**Technical reasons:**
- Every system has failure modes — hardware fails, networks partition, software has bugs, DNS/TLS certificates expire, human operators make mistakes
- Dependencies multiply risk: if your app depends on 5 services each with 99.99% availability, your theoretical max is ~99.95%
- Planned maintenance (OS patches, database upgrades, Kubernetes version upgrades) requires some downtime or degraded performance windows

**Economic reasons — the cost curve:**
- Each additional "9" costs exponentially more
- 99.9% → achievable with basic redundancy (load balancers, multiple app instances)
- 99.99% → requires multi-AZ failover, automated recovery, no single points of failure
- 99.999% → multi-region active-active, full chaos engineering, dedicated SRE teams, custom hardware

**The error budget concept (from Google SRE):**
- If your SLO is 99.9% (43 min/month allowed downtime), you have a 43-minute error budget
- As long as you're within budget, you can push changes, experiment, take risks
- If you blow the budget, you freeze releases and invest in reliability
- Setting 100% leaves no room to ship features — every outage becomes a crisis

**What to aim for:** Set your SLO just below what your customers actually notice. For most web apps, users won't notice 99.9% vs. 99.99% — but they will notice slow innovation if you over-invest in reliability.
</b></details>

<details>
<summary>Describe the workflow of setting up some type of web server (Apache, IIS, Tomcat, ...)</summary><br><b>

Here's a typical workflow for setting up an Apache web server on Linux (adaptable to Nginx, IIS, etc.):

**1. Installation**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install apache2 -y

# RHEL/CentOS
sudo dnf install httpd -y
```

**2. Basic Configuration**
- Main config: `/etc/apache2/apache2.conf` (Debian) or `/etc/httpd/conf/httpd.conf` (RHEL)
- Site configs: `/etc/apache2/sites-available/` — define virtual hosts
- Enable site: `sudo a2ensite mysite.conf && sudo a2dissite 000-default.conf`

**3. Firewall & Networking**
```bash
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
```

**4. SSL/TLS (Let's Encrypt)**
```bash
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache -d example.com
```

**5. Tune Performance**
- Adjust `MaxRequestWorkers`, `KeepAlive` settings based on expected traffic
- Enable caching modules: `mod_cache`, `mod_expires`
- Set up log rotation for access/error logs

**6. Monitoring & Health Checks**
- Configure a `/health` endpoint that returns 200 OK when the server is running
- Set up monitoring (Prometheus node_exporter, Datadog agent, CloudWatch agent)

**7. Automation (IaC approach)**
- Write an Ansible playbook or Terraform config to make the setup repeatable
- Immutable approach: bake the server config into a Docker image or AMI instead of configuring post-launch
</b></details>

<details>
<summary>How does a web server work?</summary><br><b>
<a href="https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server" title="Click here to redirect to MDN official page" style="background-color:#FFFFFF;color:#000000;text-decoration:none">According to MDN Web Docs -</a>
	
We can understand web servers using two view points, which is:
	
	(i) Hardware (ii) Software

(i)   A web server is nothing but a remote computer which stores website's component files(HTML,CSS and Javascript files) and web server's software.A web server connects to
      the Internet and supports physical data interchange with other devices connected to the web.
	
(ii)  On the software side, a web server includes several parts that control how web users access hosted files. At a minimum, this is an HTTP server. An HTTP server is software       that understands URLs (web addresses) and HTTP (the protocol your browser uses to view webpages). An HTTP server can be accessed through the domain names of the websites         it stores, and it delivers the content of these hosted websites to the end user's device.
	
## How communication between web server and web browsers established:
	
 Whenever a browser needs a file that is hosted on a web server, the browser requests the page from the web server and the web server responds with that page.
This communication between web browser and web server happens in the following ways:

(1) User enters the domain name in the browser,and the browser then search for the IP address of the entered name. It can be done in 2 ways- 
	
    -By searching in its cache. 
    -By requesting one or more DNS (Domain Name System) Servers.

(2) After knowing the IP Address, the browser requests the file via HTTP and the request reaches the correct (hardware) web server.

(3) The (software) HTTP server accepts the request, finds the requested document, and sends it back to the browser, also through HTTP. (If the server doesn't find the requested document, it returns a 404 response instead.)

(4) The Browser finally gets the webpages and displays it, or displays the error message.

</b></details>

<details>
<summary>Explain "Open Source"</summary><br><b>

Open source software is software with source code that anyone can inspect, modify, and distribute under a license that grants these rights.

**The Four Essential Freedoms (Free Software Foundation):**
1. Freedom to run the program for any purpose
2. Freedom to study how the program works and modify it
3. Freedom to redistribute copies
4. Freedom to distribute copies of your modified versions

**Key license types:**
- **Permissive** (MIT, Apache 2.0, BSD) — allow proprietary derivative works. Most common in modern infrastructure tooling.
- **Copyleft** (GPL, AGPL) — require derivative works to also be open source. If you modify GPL code and distribute it, you must release your changes.
- **Source-available** (BSL, SSPL) — you can see the code but usage is restricted (e.g., Terraform's BSL change, Elastic's SSPL).

**Why it matters for DevOps:**
- Almost all core DevOps tools are open source: Linux, Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana, Jenkins, Git
- Community-driven innovation: CVEs are found and patched faster, features are built by users who need them
- No vendor lock-in: you can self-host, fork, or switch providers
- Cost: no per-seat licensing, though enterprise support/subscriptions are common (Red Hat, SUSE, Canonical models)
</b></details>

<details>
<summary>Describe the architecture of service/app/project/... you designed and/or implemented</summary><br><b>

This is a common behavioral interview question. When answering, structure your response:

**Framework for answering:**
1. **Context** — what was the project, what problem did it solve, who were the users?
2. **High-level architecture** — draw it (or describe layers: frontend → API → backend services → database → infrastructure)
3. **Key decisions and trade-offs** — why monolith vs. microservices? Why PostgreSQL over MongoDB? Why Kubernetes over ECS?
4. **CI/CD pipeline** — how did code go from commit to production?
5. **Monitoring & observability** — how did you know it was working?
6. **What you learned** — what went well, what you'd do differently

**Example answer outline:**
"At my previous company, I architected a CI/CD platform serving 30+ engineering teams. We used Jenkins pipelines triggered by GitHub webhooks, Argo CD for Kubernetes deployments, and a custom dashboard for tracking deployment metrics. The infrastructure was Terraform-managed on AWS (EKS). Monitoring stack was Prometheus + Grafana. The key trade-off: we chose Jenkins over GitHub Actions because we needed on-premise runners for security compliance, at the cost of more maintenance overhead."

**Tip:** Be honest. If the interviewer asks about something you didn't do personally, acknowledge it — "I led the team but a colleague owned the database layer" is better than bluffing.
</b></details>

<details>
<summary>What types of tests are you familiar with?</summary><br><b>

Testing pyramid (bottom to top):

**Unit Tests** — Test individual functions/methods in isolation. Fast, reliable, cheap.
```python
def test_calculate_total():
    assert calculate_total([10, 20, 30]) == 60
```

**Integration Tests** — Test how components work together (e.g., your code + a real database). Slower, catch interface mismatches.

**Functional / E2E Tests** — Test the entire system from a user's perspective. Slowest, most brittle, but catch real-world issues.
```bash
# Playwright, Cypress, Selenium
npx playwright test checkout-flow.spec.ts
```

**API / Contract Tests** — Verify API endpoints return correct schemas. Pact for consumer-driven contract testing.

**Performance Tests:**
- Load testing: How does the system behave under expected load? (k6, Locust, JMeter)
- Stress testing: What's the breaking point?
- Soak testing: Memory leaks over time?

**Security Tests:**
- SAST (Static Application Security Testing): Analyze source code for vulnerabilities (SonarQube, Semgrep)
- DAST (Dynamic): Test running application (OWASP ZAP)
- Dependency scanning: Check third-party libraries for CVEs (Trivy, Snyk, Dependabot)

**Infrastructure Tests:**
- `terraform validate`, `terratest`, `kitchen-terraform` — verify IaC correctness
- `molecule` — test Ansible roles
- `inspec` — compliance-as-code

You should be able to explain those that you mention and when you'd use each.
</b></details>

<details>
<summary>You need to install periodically a package (unless it's already exists) on different operating systems (Ubuntu, RHEL, ...). How would you do it?</summary><br><b>

There are multiple ways to answer this question (there is no right and wrong here):

* Simple cron job
* Pipeline with configuration management technology (such Puppet, Ansible, Chef, etc.)
...
</b></details>

<details>
<summary>What is Chaos Engineering?</summary><br><b>

Wikipedia: "Chaos engineering is the discipline of experimenting on a software system in production in order to build confidence in the system's capability to withstand turbulent and unexpected conditions"

Read about Chaos Engineering [here](https://en.wikipedia.org/wiki/Chaos_engineering)
</b></details>

<details>
<summary>What is "infrastructure as code"? What implementation of IAC are you familiar with?</summary><br><b>

IAC (infrastructure as code) is a declarative approach of defining infrastructure or architecture of a system. Some implementations are ARM templates for Azure and Terraform that can work across multiple cloud providers.
</b></details>

<details>
<summary>What benefits does infrastructure-as-code have?</summary><br><b>

- fully automated process of provisioning, modifying and deleting your infrastructure
- version control for your infrastructure which allows you to quickly rollback to previous versions
- validate infrastructure quality and stability with automated tests and code reviews
- makes infrastructure tasks less repetitive
</b></details>

<details>
<summary>How do you manage build artifacts?</summary><br><b>

Build artifacts are usually stored in a repository. They can be used in release pipelines for deployment purposes. Usually there is retention period on the build artifacts.
</b></details>

<details>
<summary>What Continuous Integration solution are you using/prefer and why?</summary><br><b>

When answering, don't just name a tool — explain your criteria and reasoning:

**Evaluation criteria for CI tools:**
- **Hosted vs. self-hosted:** GitHub Actions, GitLab CI (hosted) vs. Jenkins, Drone, TeamCity (self-hosted). Self-hosted needed for air-gapped environments or compliance requirements.
- **Pipeline-as-code:** Can you define pipelines in YAML/JSON in version control? (All modern tools support this)
- **Plugin ecosystem:** Jenkins has 1800+ plugins but they're a maintenance burden; GitHub Actions marketplace is simpler
- **Container-native:** Does it run every step in a container? (Drone, Tekton — yes; Jenkins — requires configuration)
- **Cost model:** Per-minute pricing vs. flat-fee vs. free for open source

**Common choices by context:**

| Context | Common Choice | Why |
|---------|---------------|-----|
| Open source projects | GitHub Actions | Free, integrated with GitHub, large marketplace |
| Enterprise (on-prem) | Jenkins | Mature, extensible, works behind firewall |
| GitLab shop | GitLab CI | Single platform, integrated with issues/MR/CD |
| Kubernetes-native | Tekton / Argo Workflows | CRD-based, runs entirely in K8s |
| Simplicity-first | Drone CI | Container-native, minimal configuration |

**Personal recommendation example:**
"I prefer GitHub Actions for new projects because of its tight GitHub integration, large community actions marketplace, and minimal setup. For enterprise environments requiring on-premise runners, I'd use Jenkins with pipeline-as-code (Jenkinsfile) and a curated set of plugins to avoid plugin sprawl."
</b></details>

<details>
<summary>What deployment strategies are you familiar with or have used?</summary><br><b>

There are several deployment strategies:

* **Recreate** — Shut down all existing instances, then deploy the new version. Simplest but causes downtime. Suitable for non-production or when downtime is acceptable.

* **Rolling (Ramped)** — Gradually replace old instances with new ones one by one. No downtime if the application supports both versions simultaneously. Default in Kubernetes Deployments.

* **Blue-Green** — Run two identical environments ("blue" = current, "green" = new). Once green is verified, switch all traffic to it. Instant rollback (just switch back). Requires double the resources during deployment.

* **Canary** — Deploy new version to a small subset of users first (e.g., 5%), verify, then progressively roll out to 100%. Minimizes blast radius. Tools: Argo Rollouts, Flagger, Istio.

* **A/B Testing** — Route users to different versions based on rules (headers, cookies). Used for testing features/UX, not infrastructure safety. Not the same as canary (which is about risk).

* **Shadow (Traffic Mirroring)** — Send a copy of production traffic to the new version without affecting responses. Verify correctness under real load before switching.

Common tools: Kubernetes Deployments, Argo Rollouts, Spinnaker, Flagger, LaunchDarkly (feature flags).
</b></details>



<details>
<summary>You joined a team where everyone developing one project and the practice is to run tests locally on their workstation and push it to the repository if the tests passed. What is the problem with the process as it is now and how to improve it?</summary><br><b>

This is the classic "works on my machine" anti-pattern. Here are the key problems and solutions:

**Problems:**
1. **Inconsistent environments** — Different Node/Python/Java versions, OS differences (macOS vs. Linux), local env vars, installed tools. Tests that pass on one developer's machine may fail on another's.
2. **No automated enforcement** — Relying on developer discipline. Under deadline pressure, people skip tests and push anyway.
3. **No audit trail** — No record of which tests ran, with what results, for which commit.
4. **Untested integrations** — Even if unit tests pass locally, integration tests may fail against actual services.
5. **Snowflake machines** — Over time, developer workstations accumulate custom configurations that aren't reproducible.

**How to improve (CI/CD pipeline):**

1. **Set up a CI server** (GitHub Actions, Jenkins, GitLab CI) that automatically runs on every push and PR
2. **Containerize the build environment** — use Docker to ensure consistent tooling (same Node version, same OS packages)
3. **Run all test layers:**
   - Linting (pre-commit hooks + CI)
   - Unit tests (fast feedback, <5 min)
   - Integration tests (against real databases/services)
   - Security scanning (dependency checks, SAST)
4. **Branch protection rules** — Require CI to pass before merge. Block direct pushes to main.
5. **Pre-commit hooks** (optional) — Run linters/formatters locally to catch issues even before push, but CI is the source of truth.

```yaml
# Example: GitHub Actions CI workflow
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    container: node:20
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run test:integration
```
</b></details>

<details>
<summary>Explain test-driven development (TDD)</summary><br><b>

Test-Driven Development (TDD) is a software development practice where you write tests before writing the implementation code. The cycle is known as **Red-Green-Refactor**:

**The TDD Cycle:**
1. **Red** — Write a failing test for the next bit of functionality you want to add
2. **Green** — Write the minimum code to make the test pass (don't worry about elegance yet)
3. **Refactor** — Clean up the code while keeping tests green (improve design, remove duplication)

**TDD in DevOps/Infrastructure:**
TDD principles extend beyond application code:
- **Test-Infra-Code** — Write validation first, then write Terraform/Ansible to satisfy it
- Tools: `terratest` (Go testing for Terraform), `kitchen-terraform`, `molecule` (Ansible testing), `inspec` (compliance)
- Example: Before writing an Ansible role that installs Nginx, write a test that checks "port 80 is listening" and "nginx service is running"

**Benefits:**
- Catches bugs before they exist, not after
- Forces you to think about the interface/API before the implementation
- Produces a comprehensive test suite as a byproduct (not an afterthought)
- Makes refactoring safe — tests fail if you break behavior

**Criticisms / When NOT to use:**
- Exploratory/spike work where you're figuring out what to build
- UI prototyping (hard to write tests for visual design)
- Can lead to over-testing trivial code (use judgment)

**Related practices:**
- BDD (Behavior-Driven Development): Write tests in natural language (Gherkin syntax — Given/When/Then)
- ATDD (Acceptance Test-Driven Development): Collaborate on acceptance criteria before coding
</b></details>

<details>
<summary>Explain agile software development</summary><br><b>

Agile is an iterative approach to software development that emphasizes flexibility, collaboration, and customer feedback. Defined by the [Agile Manifesto](https://agilemanifesto.org/) (2001):

**The Four Values:**
1. **Individuals and interactions** over processes and tools
2. **Working software** over comprehensive documentation
3. **Customer collaboration** over contract negotiation
4. **Responding to change** over following a plan

**The 12 Principles** — key ones relevant to DevOps:
- Deliver valuable software frequently (weeks, not months)
- Welcome changing requirements, even late in development
- Business people and developers work together daily
- Continuous attention to technical excellence and good design
- At regular intervals, the team reflects on how to become more effective

**Common frameworks:**
- **Scrum** — Fixed-length sprints (1–4 weeks), Daily Standup, Sprint Planning, Sprint Review, Retrospective. Roles: Product Owner, Scrum Master, Developers.
- **Kanban** — Continuous flow, no fixed iterations. Focus on visualizing work, limiting WIP, and measuring cycle time.

**Agile ↔ DevOps relationship:**
- Agile optimizes the _development_ side (build the right thing, adapt quickly)
- DevOps extends agile principles to _operations_ (deploy quickly, run reliably)
- Together: Agile tells you what to build and how to organize; DevOps gives you the pipeline to ship it continuously
</b></details>

<details>
<summary>What do you think about the following sentence?: "Implementing or practicing DevOps leads to more secure software"</summary><br><b>

This statement is **mostly true, but conditional** — DevOps doesn't automatically make software secure; it creates the conditions where security can be built in effectively.

**Why DevOps enables better security (DevSecOps):**

1. **Shift Left** — Security checks happen early in the pipeline (SAST, dependency scanning, secret detection), not just before release. Finding a vulnerability during code review costs 10× less than finding it in production.

2. **Automation reduces human error** — Manual security reviews are inconsistent and slow. Automated scanning in CI/CD runs on every commit:
   ```bash
   # Example: security scanning in CI
   trivy fs --severity HIGH,CRITICAL .   # Filesystem vulnerability scan
   trufflehog git file://. --only-verified  # Secret detection
   ```

3. **Immutable infrastructure** — Patching servers manually is error-prone. Rebuilding images from known-good base images and redeploying ensures consistent, auditable security posture.

4. **Faster patching** — When a critical CVE drops (Log4j, OpenSSL), DevOps teams can rebuild and deploy in hours, not weeks. Traditional ops with manual patching lag behind.

5. **Audit trail** — Every change in Git, every deployment in the pipeline logs. You know who changed what, when, and who approved it.

**Where DevOps can hurt security (if done poorly):**
- **Speed over safety** — "Move fast and break things" culture can bypass security reviews
- **Tool sprawl** — More tools = more attack surface, more credentials to manage
- **Developer access to production** — Without proper RBAC, DevOps can mean "everyone has root"
- **Shadow IT** — Teams bypassing central security policies to deploy faster

**Bottom line:** DevOps provides the framework; you still need to invest in security practices (threat modeling, pen testing, compliance scanning). The term "DevSecOps" emphasizes making security a first-class citizen in the pipeline, not an afterthought.
</b></details>

<details>
<summary>Do you know what is a "post-mortem meeting"? What is your opinion on that?</summary><br><b>

A post-mortem (or "incident review") is a structured meeting held after an incident to understand what happened, why, and how to prevent it from recurring.

**Key characteristics of a good post-mortem:**

1. **Blameless** — The goal is to learn, not to assign fault. "We had a production outage because Todd made a mistake" → "We had a production outage because our deployment process lacks a confirmation step." Systems should be designed so that any individual's mistake can't cause a catastrophe.

2. **Timeline-driven** — Reconstruct the exact sequence of events:
   - When was the issue first detected? (by whom/what — monitoring alert? user report?)
   - What actions were taken? (rollback, scaling, config change)
   - When was it resolved?
   - What was the total impact? (duration, users affected, data loss)

3. **Root cause analysis** — Ask "why" repeatedly (5 Whys technique):
   - "The site was down for 45 min"
   - Why? "The deploy failed because of a misconfigured env var"
   - Why? "The env var was added manually without peer review"
   - Why? "We don't require PR reviews for config changes"
   - Why? "Config changes aren't in version control"
   - Action item: Move all config to Git with mandatory PR review.

4. **Action items** — Every post-mortem must produce concrete, trackable follow-ups (not "be more careful next time")

**My opinion:** Post-mortems are one of the most valuable DevOps practices. They turn failures into organizational learning. The key is making them truly blameless — if engineers fear punishment, they'll hide incidents instead of learning from them. Google's SRE book has excellent guidance on this.
</b></details>

<details>
<summary>What is a configuration drift? What problems is it causing?</summary><br><b>

Configuration drift happens when in an environment of servers with the exact same configuration and software, a certain server
or servers are being applied with updates or configuration which other servers don't get and over time these servers become
slightly different than all others.

This situation might lead to bugs which hard to identify and reproduce.
</b></details>

<details>
<summary>How to deal with a configuration drift?</summary><br><b>
	Configuration drift can be avoided with desired state configuration (DSC) implementation. Desired state configuration can be a declarative file that defined how a system should be. There are tools to enforce desired state such a terraform or azure dsc. There are incremental or complete strategies.
</b></details>

<details>
<summary>Explain Declarative and Procedural styles. The technologies you are familiar with (or using) are using procedural or declarative style?</summary><br><b>

Declarative - You write code that specifies the desired end state<br>
Procedural - You describe the steps to get to the desired end state

Declarative Tools - Terraform, Puppet, CloudFormation, Ansible<br>
Procedural Tools - Chef

To better emphasize the difference, consider creating two virtual instances/servers.
In declarative style, you would specify two servers and the tool will figure out how to reach that state.
In procedural style, you need to specify the steps to reach the end state of two instances/servers - for example, create a loop and in each iteration of the loop create one instance (running the loop twice of course).
</b></details>

<details>
<summary>Do you have experience with testing cross-projects changes? (aka cross-dependency)</summary><br><b>

Note: cross-dependency is when you have two or more changes to separate projects and you would like to test them in mutual build instead of testing each change separately.
</b></details>

<details>
<summary>Have you contributed to an open source project? Tell me about this experience</summary><br><b>

This is a behavioral question — the interviewer wants to gauge your collaboration skills, initiative, and technical ability.

**If you have contributed:**
Structure your answer:
- What project and why you chose it (solving a problem you had, wanted to learn, etc.)
- What your contribution was (bug fix, feature, documentation, CI/CD improvement)
- The process: how you found the issue, communicated with maintainers, iterated on the PR
- What you learned (reading a large codebase, working asynchronously, maintaining quality standards)

**If you haven't contributed code:**
Be honest, then pivot to related experience:
- "I haven't submitted a PR yet, but I've opened issues with detailed reproduction steps"
- "I contribute by answering questions in the project's Slack/Discord/Stack Overflow"
- "I maintain internal libraries that my team uses like open source — good README, changelog, contribution guide"
- "I sponsor projects I depend on via GitHub Sponsors/Open Collective"

**Why interviewers ask this:**
- Shows you can work asynchronously and communicate clearly in writing
- Demonstrates initiative (you solved a problem beyond your job scope)
- Indicates you can navigate a large, unfamiliar codebase
- Tests whether you understand collaborative development (code review, CI, contributing guidelines)
</b></details>

<details>
<summary>What is Distributed Tracing?</summary><br><b>

Distributed tracing is a monitoring method that tracks a single request as it flows through multiple services in a distributed system (microservices architecture). It answers: "Why is this request slow, and which service is the bottleneck?"

**Core concepts:**
- **Trace** — The entire journey of a request across all services (e.g., frontend → API gateway → auth service → payment service → database)
- **Span** — A single unit of work within a trace (one service call). Spans have a start time, duration, and parent-child relationships
- **Context propagation** — Passing trace IDs between services via HTTP headers (`traceparent`, `x-request-id`)

**How it works (high-level):**
```
Request → Service A (span: 50ms)
              ├── call Service B (span: 30ms)
              │       └── DB query (span: 25ms)
              └── call Service C (span: 15ms)
Total trace: 50ms — bottleneck is DB query in Service B
```

**Why it matters:**
- Pinpoint which service in a chain is causing latency
- Visualize service dependencies you didn't know existed
- Debug production issues without reproducing locally

**Tools & Standards:**
- **OpenTelemetry** — CNCF standard for collecting traces, metrics, and logs. Vendor-neutral. Used by almost all modern observability tools.
- **Jaeger** — Open source distributed tracing (originally Uber)
- **Zipkin** — Open source (originally Twitter)
- **Commercial:** Datadog APM, New Relic, Honeycomb, Lightstep

**Example (OpenTelemetry + Jaeger):**
```python
from opentelemetry import trace
tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("process-payment") as span:
    span.set_attribute("user.id", user_id)
    # ... business logic ...
```
</b></details>

### GitOps

<details>
<summary>What is GitOps?</summary><br><b>

GitLab: "GitOps is an operational framework that takes DevOps best practices used for application development such as version control, collaboration, compliance, and CI/CD tooling, and applies them to infrastructure automation".

Read more [here](https://about.gitlab.com/topics/gitops)
</b></details>

<details>
<summary>What are some of the advantages of applying GitOps?</summary><br><b>

* It introduces limited/granular access to infrastructure
* It makes it easier to trace who makes changes to infrastructure

</b></details>

<details>
<summary>When a repository refereed to as "GitOps Repository" what does it means?</summary><br><b>

A repository that doesn't holds the application source code, but the configuration, infra, ... files that required to test and deploy the application.
</b></details>

<details>
<summary>What are some practical implementations or practices of GitOp?</summary><br><b>

* Store Infra files in a version control repository (like Git)
* Apply review/approval process for changes
</b></details>

<details>
<summary>Two engineers in your team argue on where to put the configuration and infra related files of a certain application. One of them suggests to put it in the same repo as the application repository and the other one suggests to put to put it in its own separate repository. What's your take on that?</summary><br><b>

One might say we need more details as to what these configuration and infra files look like exactly and how complex the application and its CI/CD pipeline(s), but in general, most of the time you will want to put configuration and infra related files in their own separate repository and not in the repository of the application for multiple reasons:

* Every change submitted to the configuration, shouldn't trigger the CI/CD of the application, it should be testing out and applying the modified configuration, not the application itself
* When you mix application code with configuration and infra related files
</b></details>

#### SRE

<details>
<summary>What are the differences between SRE and DevOps?</summary><br><b>

Google: "One could view DevOps as a generalization of several core SRE principles to a wider range of organizations, management structures, and personnel."

Read more about it [here](https://sre.google/sre-book/introduction)
</b></details>

<details>
<summary>What SRE team is responsible for?</summary><br><b>

Google: "the SRE team is responsible for availability, latency, performance, efficiency, change management, monitoring, emergency response, and capacity planning of their services"

Read more about it [here](https://sre.google/sre-book/introduction)
</b></details>

<details>
<summary>What is an error budget?</summary><br><b>

Atlassian: "An error budget is the maximum amount of time that a technical system can fail without contractual consequences."

Read more about it [here](https://www.atlassian.com/incident-management/kpis/error-budget)
</b></details>

<details>
<summary>What do you think about the following statement: "100% is the only right availability target for a system"</summary><br><b>

Wrong. No system can guarantee 100% availability as no system is safe from experiencing zero downtime.
Many systems and services will fall somewhere between 99% and 100% uptime (or at least this is how most systems and services should be).
</b></details>

<details>
<summary>What are MTTF (mean time to failure) and MTTR (mean time to repair)? What these metrics help us to evaluate?</summary><br><b>

	* MTTF (mean time to failure) other known as uptime, can be defined as how long the system runs before if fails.
	* MTTR (mean time to recover) on the other hand, is the amount of time it takes to repair a broken system.
	* MTBF (mean time between failures) is the amount of time between failures of the system.
</b></details>

<details>
<summary>What is the role of monitoring in SRE?</summary><br><b>

Google: "Monitoring is one of the primary means by which service owners keep track of a system’s health and availability"

Read more about it [here](https://sre.google/sre-book/introduction)
</b></details>

<details>
<summary>What are the two main SRE KPIs</summary><br><b>

Service Level Indicators (SLI) and Service Level Objectives (SLO).
</b></details>

<details>
<summary>What is Toil?</summary><br><b>

Google: Toil is the kind of work tied to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and that scales linearly as a service grows

Read more about it [here](https://sre.google/sre-book/eliminating-toil/) 
</b></details>


<details>
<summary>What is a postmortem ? </summary><br><b>

The postmortem is a process that should take place following an incident. It’s purpose is to identify the root cause of an incident and the actions that should be taken to avoid this kind of incidents from happening again. </b></details>


<details>
<summary>What is the core value often put forward when talking about postmortem?</summary><br><b>

Blamelessness. 
Postmortems need to be blameless and this value should be remided at the beginning of every postmortem. This is the best way to ensure that people are playing the game to find the root cause and not trying to hide their possible faults.</b></details>

### DORA & Metrics

<details>
<summary>What are DORA metrics? Why are they important?</summary><br><b>

[DORA (DevOps Research and Assessment)](https://cloud.google.com/devops) — a Google Cloud research program that identified four key metrics that predict software delivery performance. These metrics separate elite, high, medium, and low-performing teams.

**The Four DORA Metrics:**

| Metric | What it measures | Elite benchmark |
|--------|-----------------|-----------------|
| **Deployment Frequency** | How often you deploy to production | On-demand (multiple times/day) |
| **Lead Time for Changes** | Time from code committed to code in production | < 1 hour |
| **Change Failure Rate** | % of deployments that cause a failure in production | 0–15% |
| **Time to Restore Service** | How long to recover from a failure | < 1 hour |

**Why they matter:**
- They're outcome-based, not output-based — measure delivery performance, not just activity
- They correlate with organizational performance: elite teams are 2× more likely to meet or exceed profitability, market share, and productivity goals
- Provide a common language for measuring DevOps maturity across the industry
- Unlike vanity metrics (lines of code, velocity points), DORA metrics directly measure speed AND stability — you don't have to trade one for the other

**How to track DORA metrics:**
- Deployment Frequency: count deployments from CI/CD pipeline logs
- Lead Time: measure time between git commit timestamp and production deployment timestamp
- Change Failure Rate: track rollbacks, hotfixes, or incidents caused by deployments
- Time to Restore: measure from incident detection → resolution from monitoring tools

Reference: [DORA Quick Check](https://dora.dev/quickcheck/)
</b></details>

<details>
<summary>What is the difference between Continuous Delivery and Continuous Deployment?</summary><br><b>

These terms are often confused. The key difference:

| | Continuous Delivery | Continuous Deployment |
|---|---|---|
| **Definition** | Every change is deployable (passes all tests and validations) | Every change is deployed to production automatically |
| **Production release** | Manual approval step required (click to deploy) | Fully automated, no human intervention |
| **Frequency** | Team decides when to release | Every successful commit goes to production |
| **Risk tolerance** | Suitable for regulated industries (finance, healthcare) | Suitable for SaaS with strong automated testing |

**Analogy:** Continuous Delivery is like having a pizza delivery car that's always fueled and ready — you decide when to drive. Continuous Deployment is like the car that automatically delivers the pizza the moment it's cooked.

**Pre-requisites for Continuous Deployment:**
- Extremely strong automated test suite (unit, integration, e2e)
- Feature flags to decouple deployment from release
- Robust monitoring and automated rollback
- Blast-radius limiting (canary deployments)

Most teams practice Continuous Delivery (automated up to production, manual final approval). True Continuous Deployment is rarer and mostly seen at elite-level organizations (Netflix, Amazon, Etsy).
</b></details>

<details>
<summary>What is "Platform Engineering"? How does it relate to DevOps?</summary><br><b>

Platform Engineering is the practice of building internal developer platforms (IDPs) that provide self-service capabilities to development teams. It's an evolution of DevOps, not a replacement.

**The problem it solves:**
- In large organizations, every team reinventing CI/CD, monitoring, and infrastructure tooling creates fragmentation and cognitive overload
- Developers spend 30-40% of their time on non-functional, non-business-logic work (setting up pipelines, configuring K8s, managing IAM)
- DevOps promised "you build it, you run it" — but the cognitive load of the modern toolchain is overwhelming

**What a platform provides:**
- Golden path templates: pre-configured CI/CD pipelines, Terraform modules, Helm charts
- Self-service provisioning: click a button (or CLI) to spin up a new service with best practices baked in
- Unified observability: logging, monitoring, tracing pre-configured for every service
- API/CLI/UI interface: developers interact with the platform through a consistent interface (Backstage, Port, Humanitec)

**Platform Engineering vs. DevOps:**
- DevOps is the cultural philosophy (collaboration, automation, shared ownership)
- Platform Engineering is an implementation pattern that reduces cognitive load while preserving DevOps values
- The platform team IS a DevOps team — they build the platform so 20 other product teams don't each have to learn Terraform, Helm, Prometheus, etc.

**Popular tools:** Backstage (Spotify), Humanitec, Port, Crossplane, Qovery
</b></details>

<details>
<summary>Explain "Shift Left" in DevOps</summary><br><b>

"Shift Left" means moving quality, security, and operations concerns earlier in the software delivery lifecycle — closer to the developer writing code. The earlier you catch a problem, the cheaper it is to fix.

**What gets shifted left:**

| Concern | Traditional (right) | Shifted Left |
|---------|---------------------|--------------|
| **Testing** | QA team tests after "dev complete" | Developers write tests, CI runs on every commit |
| **Security** | Penetration test before release | SAST/SCA scans in CI, pre-commit secret detection |
| **Deployability** | Ops team figures out how to deploy at release time | Deploy pipeline defined in sprint 1, infrastructure-as-code |
| **Compliance** | Audit before go-live | Policy-as-code (OPA/Kyverno) enforced in pipelines |
| **Performance** | Load test before launch | Performance tests in CI, benchmarking against baseline |

**Why it matters:**
- [IBM Systems Sciences Institute](https://www.ibm.com/): A bug found in production costs 100× more to fix than one found during design — shift left reduces the cost of quality
- Creates faster feedback loops: developer commits → 5 minutes later, they know if it's broken
- Makes security/quality everyone's responsibility, not a gatekeeper at the end

**Tools that enable Shift Left:**
- Pre-commit hooks: `pre-commit` framework
- CI scanning: Trivy, Semgrep, Checkov (IaC scanning)
- IDE plugins: SonarLint, Snyk Advisor
- Local testing: `act` (run GitHub Actions locally), Tilt, Skaffold
</b></details>

<details>
<summary>Explain the concept of "You build it, you run it"</summary><br><b>

"You build it, you run it" (YBIYRI) is a core DevOps principle popularized by Amazon/Werner Vogels (CTO of Amazon, 2006). It means the team that builds a service is also responsible for operating it in production.

**The core idea:**
- No throwing code "over the wall" to an operations team
- Developers are on-call for their services (with SRE support)
- When you feel the pain of your own design decisions at 3 AM, you make better decisions

**What it enables:**
- **Better design** — If you know you'll be paged for it, you build better error handling, logging, and graceful degradation
- **Faster feedback** — The person who wrote the code fixes the bug, instead of an ops engineer who's never seen it
- **Accountability** — No "it worked on my machine" — the developer sees real production behavior
- **Reduced MTTR** — The developer knows the system best and can diagnose faster

**What it requires:**
- Excellent observability (logs, metrics, traces must be accessible to the team)
- Automated deployment and rollback (so the developer can push fixes without ops gatekeeping)
- Blameless culture (otherwise it's just punishment disguised as ownership)
- Proper on-call compensation and rotation policies (don't burn out developers)

**Common objections and responses:**
- "Our developers don't know ops" → invest in platform engineering and self-service tools
- "It's risky to give devs production access" → use break-glass access, audit logs, and pre-approved runbooks
- "Developers should focus on features" → the line between "building" and "running" is artificial — a feature that doesn't run reliably isn't complete
</b></details>

