## Ansible

<!-- {% raw %} -->

### Ansible Exercises

|Name|Topic|Objective & Instructions|Solution|Comments|
|--------|--------|------|----|----|
| My First Task | Tasks | [Exercise](my_first_task.md) | [Solution](solutions/my_first_task.md)
| Upgrade and Update Task | Tasks | [Exercise](update_upgrade_task.md) | [Solution](solutions/update_upgrade_task.md)
| My First Playbook | Playbooks | [Exercise](my_first_playbook.md) | [Solution](solutions/my_first_playbook.md)
	

### Ansible Self Assessment

<details>
<summary>Describe each of the following components in Ansible, including the relationship between them:

  * Task
  * Inventory	
  * Module
  * Play
  * Playbook
  * Role
</summary><br><b>

Task – a call to a specific Ansible module
Module – the actual unit of code executed by Ansible on your own host or a remote host. Modules are indexed by category (database, file, network, …) and also referred to as task plugins.
	
Inventory – An inventory file defines hosts and/or groups of hosts on which Ansible tasks executed upon. The inventory file can be in one of many formats, depending on the inventory plugins you have. The most common formats are INI and YAML.

Play – One or more tasks executed on a given host(s)

Playbook – One or more plays. Each play can be executed on the same or different hosts

Role – Ansible roles allows you to group resources based on certain functionality/service such that they can be easily reused. In a role, you have directories for variables, defaults, files, templates, handlers, tasks, and metadata. You can then use the role by simply specifying it in your playbook.
</b></details>

<details>
<summary>How Ansible is different from other automation tools? (e.g. Chef, Puppet, etc.)</summary><br><b>

Ansible is:

* Agentless
* Minimal run requirements (Python & SSH) and simple to use
* Default mode is "push" (it supports also pull)
* Focus on simpleness and ease-of-use
</b></details>


<details>
<summary>True or False? Ansible follows the mutable infrastructure paradigm</summary><br><b>

True. In immutable infrastructure approach, you'll replace infrastructure instead of modifying it.<br>
Ansible rather follows the mutable infrastructure paradigm where it allows you to change the configuration of different components, but this approach is not perfect and has its own disadvantages like "configuration drift" where different components may reach different state for different reasons.
</b></details>

<details>
<summary>True or False? Ansible uses declarative style to describe the expected end state</summary><br><b>

False. It uses a procedural style.
</b></details>

<details>
<summary>What kind of automation you wouldn't do with Ansible and why?</summary><br><b>

While it's possible to provision resources with Ansible, some prefer to use tools that follow immutable infrastructure paradigm.
Ansible doesn't saves state by default. So a task that creates 5 instances for example, when executed again will create additional 5 instances (unless
additional check is implemented or explicit names are provided) while other tools might check if 5 instances exist. If only 4 exist (by checking the state file for example), one additional instance will be created to reach the end goal of 5 instances.
</b></details>

<details>
<summary>How do you list all modules and how can you see details on a specific module?</summary><br><br>

1. Ansible online docs
2. `ansible-doc -l` for list of modules and `ansible-doc [module_name]` for detailed information on a specific module
</b></details>

#### Ansible - Inventory

<details>
<summary>What is an inventory file and how do you define one?</summary><br><b>

An inventory file defines hosts and/or groups of hosts on which Ansible tasks executed upon.

An example of inventory file:

```
192.168.1.2
192.168.1.3
192.168.1.4

[web_servers]
190.40.2.20
190.40.2.21
190.40.2.22
```
</b></details>

<details>
<summary>What is a dynamic inventory file? When you would use one?</summary><br><br>

A dynamic inventory file tracks hosts from one or more sources like cloud providers and CMDB systems.

You should use one when using external sources and especially when the hosts in your environment are being automatically<br>
spun up and shut down, without you tracking every change in these sources.
</b></details>

#### Ansible - Variables

<details>
<summary>Modify the following task to use a variable instead of the value "zlib" and have "zlib" as the default in case the variable is not defined

```
- name: Install a package
  package:
    name: "zlib"
    state: present
```
</summary><br><b>

```
- name: Install a package
  package:
    name: "{{ package_name|default('zlib') }}"
    state: present
```
</b></details>

<details>
<summary>How to make the variable "use_var" optional?

```
- name: Install a package
  package:
    name: "zlib"
    state: present
    use: "{{ use_var }}"
```
</summary><br><b>


With "default(omit)"
```
- name: Install a package
  package:
    name: "zlib"
    state: present
    use: "{{ use_var|default(omit) }}"
```
</b></details>

<details>
<summary>What would be the result of the following play?</summary><br><b>

```
---
- name: Print information about my host
  hosts: localhost
  gather_facts: 'no'
  tasks:
      - name: Print hostname
        debug:
            msg: "It's me, {{ ansible_hostname }}"
```

When given a written code, always inspect it thoroughly. If your answer is “this will fail” then you are right. We are using a fact (ansible_hostname), which is a gathered piece of information from the host we are running on. But in this case, we disabled facts gathering (gather_facts: no) so the variable would be undefined which will result in failure.
</b></details>

<details>
<summary>When the value '2017'' will be used in this case: `{{ lookup('env', 'BEST_YEAR') | default('2017', true) }}`?</summary><br><b>

when the environment variable 'BEST_YEAR' is empty or false.
</b></details>

<details>
<summary>If the value of certain variable is 1, you would like to use the value "one", otherwise, use "two". How would you do it?</summary><br><b>

`{{ (certain_variable == 1) | ternary("one", "two") }}`
</b></details>

<details>
<summary>The value of a certain variable you use is the string "True". You would like the value to be a boolean. How would you cast it?</summary><br><b>

`{{ some_string_var | bool }}`
</b></details>

<details>
<summary>You want to run Ansible playbook only on specific minor version of your OS, how would you achieve that?</summary><br><b>

Use the `ansible_distribution_version` fact combined with conditionals.

**Example — run only on Ubuntu 22.04:**
```yaml
- hosts: all
  tasks:
    - name: Run only on Ubuntu 22.04
      debug:
        msg: "This is Ubuntu 22.04"
      when:
        - ansible_distribution == "Ubuntu"
        - ansible_distribution_version is version('22.04', '==')
```

**Using the `version` filter:**
```yaml
when: ansible_distribution_version is version('22.04', '>=')
```
The `version` filter supports operators: `==`, `!=`, `>=`, `<=`, `>`, `<`.

**Target a whole major version:**
```yaml
when: ansible_distribution_version is version('9', '>=')
```

**Alternative — limit at inventory level:**
```ini
[web_servers]
host1 ansible_host=10.0.0.1
host2 ansible_host=10.0.0.2

[rhel9_servers:children]
web_servers

[rhel9_servers:vars]
ansible_python_interpreter=/usr/bin/python3.9
```
</b></details>

<details>
<summary>What the "become" directive used for in Ansible?</summary><br><b>

`become` is Ansible's privilege escalation system — it allows you to run tasks as a different user (typically `root`). It's the Ansible equivalent of `sudo`, `su`, or `sudo su -`.

**Common usage:**
```yaml
- name: Install nginx
  apt:
    name: nginx
    state: present
  become: yes          # Escalate to root for this task

- name: Restart nginx as specific user
  service:
    name: nginx
    state: restarted
  become: yes
  become_user: www-data   # Become a specific user
```

**become at different levels:**
| Level | Example | Scope |
|-------|---------|-------|
| Task | `become: yes` on a single task | That task only |
| Play | `become: yes` under the play | All tasks in the play |
| CLI | `ansible-playbook play.yml --become` | The entire run |
| Inventory | `ansible_become=yes` in inventory | Per-host |

**Other become directives:**
- `become_method: sudo` (default), `su`, `doas`, `pbrun`, `runas`
- `become_flags: '-H -S'` — additional flags passed to the become method
- `become_ask_pass: true` — prompt for the become password

**Security best practice:** Only use `become: yes` on tasks that actually need elevated privileges, not blanket on every task.
</b></details>

<details>
<summary>What are facts? How to see all the facts of a certain host?</summary><br><b>

Facts are system/host information that Ansible gathers automatically at the start of each play (unless `gather_facts: no` is set). They include details about the OS, network interfaces, CPU, memory, disks, IP addresses, etc.

**Common facts:**
```yaml
ansible_hostname       # Hostname
ansible_distribution   # Ubuntu, RHEL, Debian, etc.
ansible_distribution_version  # 22.04, 9.2, etc.
ansible_os_family      # Debian, RedHat, Windows
ansible_architecture   # x86_64, aarch64
ansible_default_ipv4.address  # Primary IP address
ansible_memtotal_mb    # Total memory in MB
ansible_processor_vcpus  # CPU count
```

**View all facts for a host:**
```bash
# Ad-hoc command
ansible <hostname> -m ansible.builtin.setup

# For a specific host in a playbook
ansible <hostname> -m setup -i inventory

# Filter to specific facts
ansible <hostname> -m setup -a "filter=ansible_distribution*"

# In a playbook
- name: Print all facts
  debug:
    var: ansible_facts
```

**Using facts in playbooks:**
```yaml
- name: Install package based on OS
  apt:
    name: nginx
    state: present
  when: ansible_os_family == "Debian"

- name: Install on RHEL
  dnf:
    name: nginx
    state: present
  when: ansible_os_family == "RedHat"
```
</b></details>

<details>
<summary>What would be the result of running the following task? How to fix it?

```
- hosts: localhost
  tasks:
      - name: Install zlib
        package:
          name: zlib
          state: present
```
</summary><br><b>

The task will **fail** because installing packages requires root privileges, but `become: yes` is not set.

**Error message:**
```
fatal: [localhost]: FAILED! => {"changed": false, "msg": "You need to be root to perform this command."}
```

**Fix — add become:**
```yaml
- hosts: localhost
  become: yes       # Escalate to root
  tasks:
      - name: Install zlib
        package:
          name: zlib
          state: present
```

**Additional considerations:**
- Use the generic `package` module (auto-detects package manager) or specific module (`apt`, `dnf`, `yum`)
- The generic `package` module requires Python's `apt` or `dnf` bindings depending on the OS
- If targeting multiple OS types, use `when` conditionals with specific package names
</b></details>

<details>
<summary>Which Ansible best practices are you familiar with?. Name at least three</summary><br><b>

Key Ansible best practices:

1. **Use meaningful names** — Every play, task, role, and variable should have a descriptive name. `- name: Install and configure nginx web server` is better than `- name: run task`.

2. **Keep it idempotent** — Running the same playbook twice should produce the same result. Use modules like `lineinfile`, `template`, `copy` which are naturally idempotent. Avoid raw `command`/`shell` unless absolutely necessary.

3. **Use roles to organize** — Group related tasks, handlers, variables, templates, and files into roles. A typical structure: `roles/webserver/{tasks,handlers,templates,vars,defaults,meta}/`.

4. **Version control everything** — Store playbooks, roles, inventory, and requirements in Git. Never commit secrets (use `ansible-vault`).

5. **Use `ansible-lint`** — Validate playbooks for errors, deprecated syntax, and style violations: `ansible-lint site.yml`.

6. **Pin collection versions** — In `requirements.yml`, pin versions to avoid unexpected changes:
   ```yaml
   collections:
     - name: community.general
       version: ">=8.0.0,<9.0.0"
   ```

7. **Use `check_mode` and `diff`** — Test before applying:
   ```bash
   ansible-playbook site.yml --check --diff
   ```

8. **Encrypt sensitive data** — Use `ansible-vault` for secrets, passwords, API keys. Never store plaintext secrets in Git.

9. **Limit scope with `--limit`** — Test on a subset before rolling out to all hosts.

10. **Document dependencies** — Use `meta/main.yml` in roles to declare role dependencies.
</b></details>

<details>
<summary>Explain the directory layout of an Ansible role</summary><br><b>

An Ansible role follows a standard directory structure. You can generate it with:
```bash
ansible-galaxy role init my_role
```

**Directory layout:**
```
my_role/
├── defaults/         # Default variables (lowest priority)
│   └── main.yml
├── files/            # Static files to copy to hosts
├── handlers/         # Handlers triggered by 'notify'
│   └── main.yml
├── meta/             # Role metadata, dependencies, galaxy info
│   └── main.yml
├── tasks/            # Main list of tasks to execute
│   └── main.yml
├── templates/        # Jinja2 templates (.j2 files)
├── tests/            # Test playbook and inventory
│   ├── inventory
│   └── test.yml
├── vars/             # Role variables (higher priority than defaults)
│   └── main.yml
└── README.md         # Documentation
```

**Key directories explained:**
| Directory | Purpose |
|-----------|---------|
| `tasks/` | Contains the list of tasks. `main.yml` is the entry point. Can include other task files. |
| `defaults/` | Default values for variables. Overridden by any other variable source. |
| `vars/` | Role variables. Higher priority than defaults but lower than playbook/extra vars. |
| `handlers/` | Special tasks triggered by `notify` (e.g., restart a service after config change). |
| `templates/` | Jinja2 templates that get rendered with variables and copied to hosts. |
| `meta/` | Galaxy metadata (author, license, platform) and role dependencies. |
| `files/` | Static files (scripts, configs) to be copied as-is. |

Not all directories are required — only `tasks/` is mandatory for a minimal role.
</b></details>

<details>
<summary>What 'blocks' are used for in Ansible?</summary><br><b>

Blocks group multiple tasks together so you can apply common directives (error handling, conditionals, privilege escalation, tags) to all of them at once.

**Key use cases:**

**1. Error handling with `rescue` and `always`:**
```yaml
- block:
    - name: Attempt risky operation
      command: /usr/bin/make --jobs=4
    - name: Run post-build script
      command: /usr/bin/post-build.sh
  rescue:
    - name: Run if ANY task in the block fails
      debug:
        msg: "Build failed — cleaning up"
    - name: Send alert
      uri:
        url: https://alerts.example.com/webhook
        method: POST
  always:
    - name: This always runs (cleanup, logging)
      command: /usr/bin/cleanup.sh
```

**2. Apply conditionals to a group of tasks:**
```yaml
- block:
    - name: Install apache
      apt:
        name: apache2
    - name: Start apache
      service:
        name: apache2
        state: started
  when: ansible_os_family == "Debian"
  become: yes
```

**3. Common `become` or `tags`:**
```yaml
- block:
    - name: Copy config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
    - name: Restart nginx
      service:
        name: nginx
        state: restarted
  become: yes
  tags:
    - nginx
    - config
```

**Block semantics:**
- `block:` — The tasks to execute
- `rescue:` — Runs only if a task in the block fails (like `except` in Python)
- `always:` — Always runs, success or failure (like `finally` in Python)
</b></details>

<details>
<summary>How do you handle errors in Ansible?</summary><br><b>

Ansible provides several mechanisms for error handling:

**1. `ignore_errors: yes`** — Continue execution even if this task fails:
```yaml
- name: This might fail, that's OK
  command: /bin/false
  ignore_errors: yes
```

**2. `failed_when`** — Define custom failure conditions:
```yaml
- name: Run a script
  command: /opt/scripts/backup.sh
  register: result
  failed_when:
    - result.rc != 0
    - "'ERROR' in result.stderr"
```

**3. `block/rescue/always`** — Structured error handling:
```yaml
- block:
    - name: Try this
      command: /bin/false
  rescue:
    - name: If block fails, do this
      debug:
        msg: "Recovering from failure"
  always:
    - name: Always cleanup
      file:
        path: /tmp/lock
        state: absent
```

**4. `any_errors_fatal: true`** — Abort the entire play for all hosts if any host fails:
```yaml
- hosts: all
  any_errors_fatal: true
  tasks:
    - name: If this fails on any one host, stop everything
      ...
```

**5. `max_fail_percentage`** — Abort if more than X% of hosts fail:
```yaml
- hosts: webservers
  max_fail_percentage: 30
  tasks: ...
```

**6. `changed_when`** — Control whether a task reports as "changed":
```yaml
- name: Always report OK
  command: /usr/bin/healthcheck.sh
  changed_when: false
```
</b></details>

<details>
<summary>You would like to run a certain command if a task fails. How would you achieve that?</summary><br><b>

Use `block/rescue` — the standard way to run recovery tasks on failure:

```yaml
- name: Safe deployment
  block:
    - name: Pull new Docker image
      command: docker pull myapp:latest
    - name: Restart container
      command: docker-compose up -d
  rescue:
    - name: Send alert on failure
      uri:
        url: https://hooks.slack.com/services/xxx
        method: POST
        body: '{"text": "Deploy failed!"}'
```

**Alternative approaches:**

**Using `register` + conditional recovery:**
```yaml
- name: Attempt deployment
  command: /opt/deploy.sh
  register: deploy_result
  ignore_errors: yes

- name: Rollback on failure
  command: /opt/rollback.sh
  when: deploy_result is failed
```

**Using handlers for failure cleanup:**
```yaml
- name: Deploy app
  command: /opt/deploy.sh
  notify: cleanup on failure
  ignore_errors: yes

handlers:
  - name: cleanup on failure
    command: rm -rf /tmp/deploy-staging/*
    listen: cleanup on failure
```

The `block/rescue` approach is preferred because:
- Tasks in `rescue` only run on failure (clear intent)
- You can chain multiple rescue tasks
- `always` block runs regardless of success/failure
</b></details>

<details>
<summary>Write a playbook to install ‘zlib’ and ‘vim’ on all hosts if the file ‘/tmp/mario’ exists on the system.</summary><br><b>

```
---
- hosts: all
  vars:
      mario_file: /tmp/mario
      package_list:
          - 'zlib'
          - 'vim'
  tasks:
      - name: Check for mario file
        stat:
            path: "{{ mario_file }}"
        register: mario_f

      - name: Install zlib and vim if mario file exists
        become: "yes"
        package:
            name: "{{ item }}"
            state: present
        with_items: "{{ package_list }}"
        when: mario_f.stat.exists
```
</b></details>

<details>
<summary>Write a single task that verifies all the files in files_list variable exist on the host</summary><br><b>

```
- name: Ensure all files exist
  assert:
    that:
      - item.stat.exists
  loop: "{{ files_list }}"
```
</b></details>

<details>
<summary>Write a playbook to deploy the file ‘/tmp/system_info’ on all hosts except for controllers group, with the following content</summary><br><b>

  ```
  I'm <HOSTNAME> and my operating system is <OS>
  ```

  Replace <HOSTNAME> and  <OS> with the actual data for the specific host you are running on

The playbook to deploy the system_info file

```
---
- name: Deploy /tmp/system_info file
  hosts: all:!controllers
  tasks:
      - name: Deploy /tmp/system_info
        template:
            src: system_info.j2
            dest: /tmp/system_info
```

The content of the system_info.j2 template

```
# {{ ansible_managed }}
I'm {{ ansible_hostname }} and my operating system is {{ ansible_distribution }
```
</b></details>

<details>
<summary>The variable 'whoami' defined in the following places:

  * role defaults -> whoami: mario
  * extra vars (variables you pass to Ansible CLI with -e) -> whoami: toad
  * host facts -> whoami: luigi
  * inventory variables (doesn’t matter which type) -> whoami: browser

According to variable precedence, which one will be used?</summary><br><b>

The right answer is ‘toad’.

Variable precedence is about how variables override each other when they set in different locations. If you didn’t experience it so far I’m sure at some point you will, which makes it a useful topic to be aware of.

In the context of our question, the order will be extra vars (always override any other variable) -> host facts -> inventory variables -> role defaults (the weakest).

Here is the order of precedence from least to greatest (the last listed variables winning prioritization):

1. command line values (eg “-u user”)
2. role defaults [[1\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id15)
3. inventory file or script group vars [[2\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id16)
4. inventory group_vars/all [[3\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id17)
5. playbook group_vars/all [[3\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id17)
6. inventory group_vars/* [[3\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id17)
7. playbook group_vars/* [[3\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id17)
8. inventory file or script host vars [[2\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id16)
9. inventory host_vars/* [[3\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id17)
10. playbook host_vars/* [[3\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id17)
11. host facts / cached set_facts [[4\]](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#id18)
12. play vars
13. play vars_prompt
14. play vars_files
15. role vars (defined in role/vars/main.yml)
16. block vars (only for tasks in block)
17. task vars (only for the task)
18. include_vars
19. set_facts / registered vars
20. role (and include_role) params
21. include params
22. extra vars (always win precedence)

A full list can be found at  [PlayBook Variables](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#ansible-variable-precedence) . Also, note there is a significant difference between Ansible 1.x and 2.x.
</b></details>

<details>
<summary>For each of the following statements determine if it’s true or false:

  * A module is a collection of tasks
  * It’s better to use shell or command instead of a specific module
  * Host facts override play variables
  * A role might include the following: vars, meta, and handlers
  * Dynamic inventory is generated by extracting information from external sources
  * It’s a best practice to use indentation of 2 spaces instead of 4
  * ‘notify’ used to trigger handlers
  * This “hosts: all:!controllers” means ‘run only on controllers group hosts</summary><br><b>

| Statement | True/False | Explanation |
|-----------|------------|-------------|
| A module is a collection of tasks | **False** | A module is a single unit of code (e.g., `apt`, `copy`, `service`). A **play** is a collection of tasks. |
| It’s better to use shell or command instead of a specific module | **False** | Use specific modules whenever possible — they’re idempotent, handle errors better, and report meaningful “changed” status. `shell`/`command` should be a last resort. |
| Host facts override play variables | **False** | Play variables override host facts. Variable precedence: extra vars > play vars > host facts > inventory vars > role defaults. |
| A role might include the following: vars, meta, and handlers | **True** | A role can include `vars/`, `meta/`, `handlers/`, plus `tasks/`, `defaults/`, `templates/`, and `files/`. |
| Dynamic inventory is generated by extracting information from external sources | **True** | Dynamic inventory scripts/plugins query cloud providers (AWS, GCP, Azure), CMDBs, or other sources to build the inventory at runtime. |
| It’s a best practice to use indentation of 2 spaces instead of 4 | **True** | YAML convention uses 2 spaces for indentation. Ansible playbooks follow this standard. |
| ‘notify’ used to trigger handlers | **True** | `notify` tells Ansible to run a handler (e.g., restart a service) if the task reports “changed”. Handlers run once at the end of the play, even if notified multiple times. |
| This “hosts: all:!controllers” means ‘run only on controllers group hosts | **False** | The `!` means EXCLUDE. `all:!controllers` runs on ALL hosts EXCEPT those in the `controllers` group. |
</b></details>

<details>
<summary>Explain the Difference between Forks and Serial & Throttle.</summary><br><b>

`Serial` is like running the playbook for each host in turn, waiting for completion of the complete playbook before moving on to the next host. `forks`=1 means run the first task in a play on one host before running the same task on the next host, so the first task will be run for each host before the next task is touched. Default fork is 5 in ansible.

```
[defaults]
forks = 30
```

```
- hosts: webservers
  serial: 1
  tasks:
    - name: ...
```

Ansible also supports `throttle` This keyword limits the number of workers up to the maximum set via the forks setting or serial. This can be useful in restricting tasks that may be CPU-intensive or interact with a rate-limiting API

```
tasks:
- command: /path/to/cpu_intensive_command
  throttle: 1
```

</b></details>

<details>
<summary>What is ansible-pull? How is it different from how ansible-playbook works?</summary><br><b>

`ansible-pull` inverts Ansible's default push architecture: instead of the control node pushing configurations to managed hosts, each host pulls configurations from a Git repository and applies them locally.

**ansible-playbook (Push — default):**
```
Control Node ──push──> Host A
              ──push──> Host B
              ──push──> Host C
```
```bash
ansible-playbook -i inventory site.yml
```

**ansible-pull (Pull — inverted):**
```
Git Repo <──pull── Host A (applies to self)
          <──pull── Host B (applies to self)
          <──pull── Host C (applies to self)
```
```bash
ansible-pull -U https://github.com/org/ansible-config.git site.yml
```

**When to use ansible-pull:**
- **Auto-scaling groups** — New instances configure themselves on boot without a central control node contacting them
- **Ephemeral/disconnected hosts** — Laptops or edge devices that aren't always reachable from a central node
- **Massive scale** — Distributing the load from one control node to all hosts pulling independently

**Typical cron-based setup:**
```bash
# /etc/cron.d/ansible-pull
*/30 * * * * root ansible-pull -U https://git.example.com/ansible.git -C production site.yml >> /var/log/ansible-pull.log 2>&1
```

**Key differences:**
| | ansible-playbook | ansible-pull |
|---|---|---|
| Direction | Push (control → hosts) | Pull (hosts → git) |
| Initiator | Operator | Cron/systemd timer on host |
| Inventory | Defined centrally | Typically `localhost,` |
| Use case | Operator-driven changes | Auto-bootstrap, auto-heal |
</b></details>



<details>
<summary>What is Ansible Vault?</summary><br><b>

Ansible Vault encrypts sensitive data (passwords, API keys, SSH keys, certificates) so they can be safely stored in version control alongside your playbooks.

**Common operations:**
```bash
# Create a new encrypted file
ansible-vault create secrets.yml

# Edit an encrypted file
ansible-vault edit secrets.yml

# Encrypt an existing file
ansible-vault encrypt vars/production.yml

# Decrypt (remove encryption)
ansible-vault decrypt vars/production.yml

# View without editing
ansible-vault view secrets.yml

# Change password
ansible-vault rekey secrets.yml
```

**Using encrypted variables in playbooks:**
```yaml
# secrets.yml (encrypted)
db_password: "super_secret_password"
api_key: "sk-1234567890"

# playbook.yml
- hosts: databases
  vars_files:
    - secrets.yml
  tasks:
    - name: Configure database
      mysql_user:
        name: app_user
        password: "{{ db_password }}"
```

**Running playbooks with Vault:**
```bash
# Prompt for password
ansible-playbook site.yml --ask-vault-pass

# Password from file (CI/CD)
ansible-playbook site.yml --vault-password-file .vault-pass

# Password from environment variable
echo "$VAULT_PASSWORD" > /tmp/vault-pass
ansible-playbook site.yml --vault-password-file /tmp/vault-pass
```

**Best practices:**
- Encrypt `vars/` files, NOT playbooks themselves
- Use a `.vault-pass` file that is in `.gitignore` for local dev
- In CI/CD, store vault password as a secret (GitHub Secrets, GitLab CI Variables)
- Use `--vault-id` for multiple vault passwords (dev/prod)
</b></details>

<details>
<summary>Demonstrate each of the following with Ansible:

  * Conditionals
  * Loops
</summary><br><b>

**Conditionals:**

```yaml
# Simple when
- name: Install apache on Debian only
  apt:
    name: apache2
    state: present
  when: ansible_os_family == "Debian"

# Multiple conditions (AND)
- name: Run only on production web servers
  debug:
    msg: "Production web server"
  when:
    - inventory_hostname in groups['web_servers']
    - env == "production"

# OR condition
- name: Install on Ubuntu OR CentOS
  package:
    name: nginx
    state: present
  when: ansible_distribution == "Ubuntu" or ansible_distribution == "CentOS"

# Based on registered variable
- name: Check if file exists
  stat:
    path: /etc/myapp/config.yml
  register: config_file

- name: Copy default config if missing
  copy:
    src: default-config.yml
    dest: /etc/myapp/config.yml
  when: not config_file.stat.exists

# Ternary
- name: Set environment-specific port
  set_fact:
    app_port: "{{ (env == 'production') | ternary(443, 8080) }}"
```

**Loops:**

```yaml
# loop (Recommended — replaces with_items)
- name: Install multiple packages
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - postgresql
    - redis

# loop with complex items (dict)
- name: Create users
  user:
    name: "{{ item.username }}"
    groups: "{{ item.groups }}"
    state: present
  loop:
    - { username: 'alice', groups: 'developers' }
    - { username: 'bob', groups: 'developers,admin' }

# loop + when (per-item conditional)
- name: Install packages except on dev
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - postgresql
  when: env != "dev"

# loop_control (label, index, pause)
- name: Process items with index
  debug:
    msg: "{{ index }}: {{ item }}"
  loop:
    - foo
    - bar
  loop_control:
    index_var: index
    label: "{{ item }}"    # Show this in output instead of full dict

# until (retry loop)
- name: Wait for service to be ready
  uri:
    url: http://localhost:8080/health
  register: result
  until: result.status == 200
  retries: 12
  delay: 10
```
</b></details>

<details>
<summary>What are filters? Do you have experience with writing filters?</summary><br><b>

Filters are Jinja2 functions that transform data in Ansible templates and playbooks. They're applied with the `|` pipe operator.

**Common built-in filters:**

```yaml
# Default values
"{{ some_var | default('fallback') }}"
"{{ some_var | default(omit) }}"          # Omit parameter entirely if undefined

# Data manipulation
"{{ [1, 2, 3, 2] | unique }}"             # [1, 2, 3]
"{{ [1, 2, 3] | min }}"                   # 1
"{{ [1, 2, 3] | max }}"                   # 3
"{{ {'a': 1, 'b': 2} | dict2items }}"     # Convert dict to list of items

# JSON/YAML
"{{ some_dict | to_nice_json }}"
"{{ some_dict | to_nice_yaml }}"

# Type conversion
"{{ 'True' | bool }}"                     # boolean True
"{{ 42 | string }}"                       # "42"
"{{ some_var | type_debug }}"             # Show data type

# Path/file operations
"{{ '/etc/nginx/nginx.conf' | basename }}"  # nginx.conf
"{{ '/etc/nginx/nginx.conf' | dirname }}"   # /etc/nginx

# Version comparison
"{{ ansible_distribution_version is version('22.04', '>=') }}"
```

**Writing custom filters:**

Create a `filter_plugins/` directory next to your playbook:
```python
# filter_plugins/custom_filters.py
def capitalize_string(s):
    return s.capitalize()

def to_gigabytes(value_in_mb):
    return round(value_in_mb / 1024, 2)

class FilterModule:
    def filters(self):
        return {
            'capitalize': capitalize_string,
            'to_gb': to_gigabytes,
        }
```

**Usage in playbook:**
```yaml
- debug:
    msg: "{{ 'hello world' | capitalize }}"    # "Hello world"
- debug:
    msg: "{{ ansible_memtotal_mb | to_gb }} GB"
```
</b></details>

<details>
<summary>Write a filter to capitalize a string</summary><br><b>

```
def cap(self, string):
    return string.capitalize()
```
</b></details>

<details>
<summary>You would like to run a task only if previous task changed anything. How would you achieve that?</summary><br><b>

Use `register` to capture the result, then check `is changed` in the next task's condition:

```yaml
- name: Update configuration file
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
  register: config_result

- name: Restart nginx if config changed
  service:
    name: nginx
    state: restarted
  when: config_result is changed
```

**Alternative — using `notify`/handlers (preferred for service restarts):**
```yaml
tasks:
  - name: Update nginx config
    template:
      src: nginx.conf.j2
      dest: /etc/nginx/nginx.conf
    notify: restart nginx    # Only triggers handler if task changed

handlers:
  - name: restart nginx
    service:
      name: nginx
      state: restarted
```

**Compare register vs. handlers:**
| Approach | When to use |
|----------|-------------|
| `register` + `when: result is changed` | One-off downstream tasks, or when you need the result for multiple actions |
| `notify` + `handlers` | Standard pattern for restarting/reloading services. Handlers run once at end of play even if notified multiple times. |

**Check other task attributes:**
```yaml
when: result is failed      # Task failed
when: result is succeeded   # Task succeeded
when: result is skipped     # Task was skipped (via when)
when: result.rc != 0        # Non-zero return code
```
</b></details>

<details>
<summary>What are callback plugins? What can you achieve by using callback plugins?</summary><br><b>

Callback plugins control Ansible's output and enable integration with external systems. They hook into Ansible events (task start, task end, playbook complete, etc.).

**Categories of callback plugins:**

**1. Output formatting (stdout callbacks):**
```bash
# Change output style
export ANSIBLE_STDOUT_CALLBACK=yaml     # Structured YAML output
export ANSIBLE_STDOUT_CALLBACK=json     # JSON output
export ANSIBLE_STDOUT_CALLBACK=unixy    # Unix-tool style
```

**Available stdout callbacks:**
- `default` — Standard output
- `yaml` / `json` — Machine-readable
- `minimal` — Only task name and result
- `actionable` — Only show tasks that had "changed" or "failed"
- `profile_tasks` — Show execution time per task
- `timer` — Show total playbook duration

**2. Notification/Integration callbacks:**
```yaml
# ansible.cfg
[defaults]
callback_whitelist = profile_tasks, slack
```
- `slack` — Send playbook results to Slack
- `log_plays` — Log every play to a file
- `mail` — Send email on failure
- `sumologic` — Send logs to SumoLogic
- `grafana_annotations` — Create Grafana annotations on deploy

**Custom callback plugin:**
```python
# callback_plugins/custom_notify.py
from ansible.plugins.callback import CallbackBase

class CallbackModule(CallbackBase):
    CALLBACK_VERSION = 2.0
    CALLBACK_TYPE = 'notification'
    CALLBACK_NAME = 'custom_notify'

    def v2_playbook_on_stats(self, stats):
        hosts = stats.processed.keys()
        for host in hosts:
            summary = stats.summarize(host)
            print(f"Host {host}: {summary}")
```

**Common use case — performance profiling:**
```bash
ansible-playbook site.yml -e ansible_callback=profile_tasks
# Output:
# ======
# update apt cache ------------ 12.45s
# install nginx --------------- 5.32s
# configure nginx -------------- 0.89s
```
</b></details>

<details>
<summary>What is the difference between `include_task` and `import_task`?</summary><br><b>

| Aspect | `include_tasks` | `import_tasks` |
|--------|----------------|----------------|
| **When processed** | Dynamically at runtime | Statically at parse time |
| **Conditional application** | `when` applies to each included task individually | `when` applies to ALL imported tasks as a block |
| **Loops** | Can use `loop` with include_tasks | Cannot loop over import_tasks |
| **Tags** | Tags apply to each included task | Tags apply to all imported tasks |
| **Performance** | Slightly slower (evaluated at runtime) | Slightly faster (evaluated once) |

**Example — `import_tasks` (static):**
```yaml
- name: Import setup tasks
  import_tasks: setup.yml
  when: env == "production"
  tags: setup
```
All tasks in `setup.yml` get the `when` condition and `setup` tag applied as a group. The file must exist when the playbook is parsed.

**Example — `include_tasks` (dynamic):**
```yaml
- name: Include OS-specific tasks
  include_tasks: "{{ ansible_os_family }}.yml"

- name: Loop over includes
  include_tasks: per_user.yml
  loop: "{{ user_list }}"
  loop_control:
    loop_var: username
```
The filename can use variables. Can be looped. `when` applies per-task.

**Rule of thumb:**
- Use `import_tasks` for static, always-loaded task files (basic setup, common operations)
- Use `include_tasks` when: filename depends on a variable, you need to loop, or you need per-task conditionals
- Similarly: `import_playbook` vs. `include_role` (dynamic) vs. `import_role` (static)

**Also note:** There's `import_playbook` (static, import entire playbooks) and `include_role`/`import_role` (dynamic/static role inclusion).
</b></details>

<details>
<summary>File '/tmp/exercise' includes the following content

```
Goku = 9001
Vegeta = 5200
Trunks = 6000
Gotenks = 32
```

With one task, switch the content to:

```
Goku = 9001
Vegeta = 250
Trunks = 40
Gotenks = 32
```
</summary><br><b>

```
- name: Change saiyans levels
  lineinfile:
    dest: /tmp/exercise
    regexp: "{{ item.regexp }}"
    line: "{{ item.line }}"
  with_items:
    - { regexp: '^Vegeta', line: 'Vegeta = 250' }
    - { regexp: '^Trunks', line: 'Trunks = 40' }
    ...
```
</b></details>


#### Ansible - Execution and Strategy

<details>
<summary>True or False? By default, Ansible will execute all the tasks in play on a single host before proceeding to the next host</summary><br><b>

False. Ansible will execute a single task on all hosts before moving to the next task in a play. As for today, it uses 5 forks by default.<br>
This behavior is described as "strategy" in Ansible and it's configurable.
</b></details>

<details>
<summary>What is a "strategy" in Ansible? What is the default strategy?</summary><br><b>

A strategy in Ansible describes how Ansible will execute the different tasks on the hosts. By default Ansible is using the "Linear strategy" which defines that each task will run on all hosts before proceeding to the next task.
</b></details>

<details>
<summary>What strategies are you familiar with in Ansible?</summary><br><b>

  - Linear: the default strategy in Ansible. Run each task on all hosts before proceeding.
  - Free: For each host, run all the tasks until the end of the play as soon as possible
  - Debug: Run tasks in an interactive way
</b></details>

<details>
<summary>What the <code>serial</code> keyword is used for?</summary><br><b>

It's used to specify the number (or percentage) of hosts to run the full play on, before moving to next number of hosts in the group.

For example:
```
- name: Some play
  hosts: databases
  serial: 4
```

If your group has 8 hosts. It will run the whole play on 4 hosts and then the same play on another 4 hosts.
</b></details>

#### Ansible Testing

<details>
<summary>How do you test your Ansible based projects?</summary><br><b>

A multi-layered testing approach for Ansible projects:

**1. Static Analysis:**
```bash
# Lint playbooks
ansible-lint site.yml

# Syntax check
ansible-playbook site.yml --syntax-check

# Check mode (dry run)
ansible-playbook site.yml --check --diff
```

**2. Unit/Functional Testing with Molecule:**
```bash
# Install
pip install molecule molecule-plugins[docker]

# Initialize test scenario
molecule init scenario -r my_role --driver-name docker

# Test workflow
molecule lint         # Lint the role
molecule create       # Create test instances (Docker containers)
molecule converge     # Apply the role
molecule verify       # Run testinfra/ansible tests
molecule idempotence  # Run converge again — must show 0 changes
molecule destroy      # Clean up
molecule test         # Run all steps above in sequence
```

**Example `molecule/default/verify.yml`:**
```yaml
- name: Verify nginx is installed and running
  hosts: all
  tasks:
    - name: Check nginx package
      package_facts:
        manager: auto
    - name: Assert nginx is installed
      assert:
        that: "'nginx' in ansible_facts.packages"
    - name: Check port 80 is listening
      wait_for:
        port: 80
        timeout: 5
```

**3. Integration Testing:**
- `testinfra` — Pytest plugin for infrastructure testing
- `ansible-verify` — Run assertion playbooks after deployment

**4. CI/CD Pipeline integration:**
```yaml
# .github/workflows/ansible-ci.yml
jobs:
  test:
    steps:
      - uses: actions/checkout@v4
      - run: pip install ansible ansible-lint molecule molecule-plugins[docker]
      - run: ansible-lint site.yml
      - run: cd roles/my_role && molecule test
```

**5. Secrets validation:**
```bash
# Ensure no plaintext secrets in code
git secrets --scan
trufflehog filesystem .
```
</b></details>

<details>
<summary>What is Molecule? How does it works?</summary><br><b>

It's used to rapidy develop and test Ansbile roles.  Molecule can be used to test Ansible roles against a varaitey of Linux Distros at the same time.  This testing ability helps instill confidence of the automation today and as time go on while a role is maintined.  

</b></details>

<details>
<summary>You run Ansible tests and you get "idempotence test failed". What does it mean? Why idempotence is important?</summary><br><b>

**"Idempotence test failed" means:** Running the same playbook twice produced different results. The second run reported `changed=1` (or more), meaning something was modified on the second pass when it should have been a no-op.

**Why it happens:**
- Using `command`/`shell` modules that always report "changed" — these don't check state
- Not using `creates`/`removes` with command modules
- A template that generates different output each run (e.g., includes a timestamp)
- A task that's reading mutable state (e.g., checking a dynamically changing value)

**How to fix:**
```yaml
# ❌ Always reports changed
- name: Run script
  command: /opt/scripts/init.sh

# ✅ Only runs if output file doesn't exist
- name: Run script
  command:
    cmd: /opt/scripts/init.sh
    creates: /opt/scripts/.initialized

# ✅ Use changed_when
- name: Run health check
  command: /opt/health-check.sh
  register: health
  changed_when: false
```

**Why idempotence is important:**
1. **Predictability** — You know exactly what changed and when. Running the same config 10 times shouldn't produce 10 different results.
2. **Confidence** — If `changed=0` on the second run, you're confident the system is in the expected state. If `changed>0`, something is drifting.
3. **Audit trails** — Changes map to specific playbook runs. Hard to audit when every run reports changes.
4. **Reduced risk** — Idempotent playbooks are safe to re-run. Non-idempotent ones might break things on subsequent runs.
5. **Compliance** — Proves configuration management is actually managing configuration, not just running scripts.

**Molecule's idempotence check:**
```bash
molecule idempotence   # Runs converge twice, second run must show changed=0
```
If the second converge shows ANY changes, the idempotence test fails. This catches non-idempotent tasks before they reach production.
</b></details>

#### Ansible - Debugging

<details>
<summary>How to find out the data type of a certain variable in one of the playbooks?</summary><br><b>

"{{ some_var | type_debug }}"
</b></details>

#### Ansible - Collections

<details>
<summary>What are collections in Ansible?</summary><br><b>
Ansible Collections are a way to package and distribute modules, roles, plugins, and documentation in a structured format. They help organize and distribute automation code efficiently, especially for complex environments.
</b></details>

<details>
<summary>Why Use Ansible Collections?</summary><br><b>

  - Modular and reusable components
  - Simplifies management of custom and third-party modules
  - Provides a standardized way to distribute automation content
  - Helps in version control and dependency management
</b></details>

### Ansible vs. Other Tools

<details>
<summary>Compare Ansible with Terraform. When would you use each?</summary><br><b>

| | Ansible | Terraform |
|---|---|---|
| **Primary use** | Configuration management, app deployment | Infrastructure provisioning |
| **Paradigm** | Procedural (execute tasks in order) | Declarative (define desired state) |
| **State management** | Stateless by default | Maintains state file (terraform.tfstate) |
| **Infra lifecycle** | No native destroy — you write cleanup tasks | Full lifecycle: plan, apply, destroy |
| **Agent** | Agentless (SSH/WinRM) | Agentless (API calls) |
| **Idempotency** | Module-level (most modules are idempotent) | Architecture-level (compares desired vs. actual state) |
| **Language** | YAML (playbooks) | HCL (HashiCorp Configuration Language) |

**When to use Ansible:**
- Configuring servers post-provisioning (install packages, configure services, deploy apps)
- Day-2 operations (patching, updating, ongoing maintenance)
- Immutable image building (Packer + Ansible provisioner)
- Simple orchestration (restart services in order, run DB migrations)

**When to use Terraform:**
- Provisioning cloud infrastructure (VMs, VPCs, databases, load balancers, DNS)
- Managing infrastructure lifecycle (create, update, destroy with dependency tracking)
- Multi-cloud infrastructure (Terraform works across AWS, GCP, Azure, etc.)
- Infrastructure that needs state tracking (Terraform knows if a resource was created outside of it)

**They complement each other (common pattern):**
```
Terraform provisions infrastructure → Ansible configures it
```
```bash
# Terraform provisions the VM and outputs its IP
terraform apply -auto-approve

# Ansible configures the VM using the IP from Terraform
ansible-playbook -i "$(terraform output -raw vm_ip)," site.yml
```
</b></details>

<details>
<summary>What are Ansible Execution Environments (EE)? What is Ansible Navigator?</summary><br><b>

**Ansible Execution Environments (EE)** are container images that bundle Ansible Core, collections, Python dependencies, and system libraries into a single, consistent runtime. They replace the traditional approach of installing everything on a control node.

**Why EEs exist:**
- **Dependency hell** — Different projects need different Python/Ansible versions and collections
- **Consistency** — "Works on my control node" → "Works everywhere" (same container image)
- **Security** — Containerized execution, no Python packages installed on the control host
- **AWX/AAP** — Red Hat Ansible Automation Platform uses EEs natively

**Building an EE:**
```yaml
# execution-environment.yml
---
version: 3
dependencies:
  galaxy: requirements.yml
  python: requirements.txt
images:
  base_image:
    name: registry.redhat.io/ansible-automation-platform-24/ee-minimal-rhel9:latest
```
```bash
ansible-builder build -t my-ee:latest
```

**Ansible Navigator** is the next-generation CLI that replaces `ansible-playbook`, `ansible-doc`, `ansible-inventory` and consolidates them into one tool:
```bash
# Run a playbook inside an EE
ansible-navigator run site.yml --eei my-ee:latest

# Browse inventory interactively
ansible-navigator inventory -i hosts.yml --eei my-ee:latest

# Browse available collections
ansible-navigator collections --eei my-ee:latest

# Interactive mode (TUI)
ansible-navigator
```

**Key Navigator features:**
- TUI (Text-based User Interface) for browsing playbook results
- Built-in lint with `ansible-lint`
- Execution Environment integration out of the box
- Playbook artifact generation (JSON log of each run)

This is the direction Ansible is heading: container-first, reproducible execution with a unified CLI.
</b></details>


