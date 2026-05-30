## Shell Scripting

### Shell Scripting Exercises

|Name|Topic|Objective & Instructions|Solution|Comments|
|--------|--------|------|----|----|
|Hello World|Variables|[Exercise](hello_world.md)|[Solution](solutions/hello_world.md) | Basic
|Basic date|Variables|[Exercise](basic_date.md)|[Solution](solutions/basic_date.md) | Basic
|Great Day|Variables|[Exercise](great_day.md)|[Solution](solutions/great_day.md) | Basic
|Factors|Arithmetic|[Exercise](factors.md)|[Solution](solutions/factors.md) | Basic
|Argument Check|Conditionals|[Exercise](argument_check.md)|[Solution](solutions/argument_check.md) | Basic
|Files Size|For Loops|[Exercise](files_size.md)|[Solution](solutions/files_size.md) | Basic
|Count Chars|Input + While Loops|[Exercise](count_chars.md)|[Solution](solutions/count_chars.md) | Basic
|Sum|Functions|[Exercise](sum.md)|[Solution](solutions/sum.md) | Basic
|Number of Arguments|Case Statement|[Exercise](num_of_args.md)|[Solution](solutions/num_of_args.md) | Basic
|Empty Files|Misc|[Exercise](empty_files.md)|[Solution](solutions/empty_files.md) | Basic
|Directories Comparison|Misc|[Exercise](directories_comparison.md)|[Solution](solutions/directories_comparison.md) | Basic
|It's alive!|Misc|[Exercise](host_status.md)|[Solution](solutions/host_status.md) | Intermediate

## Shell Scripting - Self Assessment

<details>
<summary>What does this line in shell scripts means?: <code>#!/bin/bash</code></summary><br><b>


`#!/bin/bash` is She-bang

/bin/bash is the most common shell used as default shell for user login of the linux system. The shell’s name is an acronym for Bourne-again shell. Bash can execute the vast majority of scripts and thus is widely used because it has more features, is well developed and better syntax.

</b></details>

<details>
<summary>True or False? When a certain command/line fails in a shell script, the shell script, by default, will exit and stop running</summary><br><b>

Depends on the language and settings used.
If the script is a bash script then this statement is true. When a script written in Bash fails to run a certain command it will keep running and will execute all other commands mentioned after the command which failed.

Most of the time we might actually want the opposite to happen. In order to make Bash exist when a specific command fails, use 'set -e' in your script.
</b></details>

<details>
<summary>What do you tend to include in every script you write?</summary><br><b>

Few example:

  * Comments on how to run it and/or what it does
  * If a shell script, adding "set -e" since I want the script to exit if a certain command failed

You can have an entirely different answer. It's based only on your experience and preferences.
</b></details>

<details>
<summary>Today we have tools and technologies like Ansible, Puppet, Chef, ... Why would someone still use shell scripting?</summary><br><b>

  * Speed
  * Flexibility
  * The module we need doesn't exist (perhaps a weak point because most CM technologies allow to use what is known as "shell" module)
  * We are delivering the scripts to customers who don't have access to the public network and don't necessarily have Ansible installed on their systems.
</b></details>

#### Shell Scripting - Variables

<details>
<summary>How to define a variable with the value "Hello World"?</summary><br><b>

`HW="Hello World`
</b></details>

<details>
<summary>How to define a variable with the value of the current date?</summary><br><b>

`DATE=$(date)`
</b></details>

<details>
<summary>How to print the first argument passed to a script?</summary><br><b>

`echo $1`
</b></details>

<details>
<summary>Write a script to print "yay" unless an argument was passed and then print that argument</summary><br><b>

```
echo "${1:-yay}"
```
</b></details>

<details>
<summary>What would be the output of the following script?

```
#!/usr/bin/env bash
NINJA_TURTLE=Donatello
function the_best_ninja_turtle {
        local NINJA_TURTLE=Michelangelo
        echo $NINJA_TURTLE
}
NINJA_TURTLE=Raphael
the_best_ninja_turtle
```
</summary><br><b>
Michelangelo
</b></details>

<details>
<summary>Explain what would be the result of each command:

  * <code>echo $0</code>
  * <code>echo $?</code>
  * <code>echo $$</code>
  * <code>echo $#</code></summary><br><b>

These are special shell variables:
| Variable | Meaning | Example |
|----------|---------|---------|
| `$0` | Name of the script/process | `./myscript.sh` |
| `$?` | Exit code of the last command | `0` = success, non-zero = failure |
| `$$` | Process ID (PID) of the current shell/script | `12345` |
| `$#` | Number of arguments passed to the script | `3` |

**Practical usage:**
```bash
#!/bin/bash
echo "Running $0 with PID $$"
echo "You passed $# arguments"
some_command
if [ $? -ne 0 ]; then
    echo "some_command failed with exit code $?"
fi
```
</b></details>

<details>
<summary>What is <code>$@</code>?</summary><br><b>

`$@` expands to all positional parameters (arguments) passed to a script or function, with each argument treated as a **separate quoted string**. It's the safest way to iterate over arguments.

**Example:**
```bash
#!/bin/bash
for arg in "$@"; do
    echo "Arg: $arg"
done
# ./script.sh "hello world" foo  → Arg: hello world, Arg: foo
```

**`$@` vs `$*`:**
| | `$@` | `$*` |
|---|---|---|
| Quoted | `"$@"` → `"arg1" "arg2" "arg3"` | `"$*"` → `"arg1 arg2 arg3"` (one string) |
| Best for | Iterating arguments safely | Joining all args into one string |

**Always use `"$@"` when iterating arguments** — it preserves spaces within arguments.
</b></details>

<details>
<summary>What is difference between <code>$@</code> and <code>$*</code>?</summary><br><b>

`$@` is an array of all the arguments passed to the script
`$*` is a single string of all the arguments passed to the script
</b></details>

<details>
<summary>How do you get input from the user in shell scripts?</summary><br><b>

Using the keyword <code>read</code> so for example <code>read x</code> will wait for user input and will store it in the variable x.
</b></details>

<details>
<summary>How to compare variables length?</summary><br><b>

```
if [ ${#1} -ne ${#2} ]; then
    ...
```
</b></details>

#### Shell Scripting - Conditionals

<details>
<summary>Explain conditionals and demonstrate how to use them</summary><br><b>

Conditionals control script flow based on conditions.

**if/elif/else:**
```bash
if [ "$name" = "Todd" ]; then
    echo "Hello Todd"
elif [ "$name" = "root" ]; then
    echo "Hello root"
else
    echo "Who are you?"
fi
```

**Common test operators:**
```bash
# String comparisons
[ "$a" = "$b" ]       # Equal
[ "$a" != "$b" ]      # Not equal
[ -z "$a" ]           # Is empty/zero length
[ -n "$a" ]           # Is NOT empty

# Numeric comparisons
[ "$a" -eq "$b" ]     # Equal
[ "$a" -ne "$b" ]     # Not equal
[ "$a" -gt "$b" ]     # Greater than
[ "$a" -lt "$b" ]     # Less than

# File tests
[ -f "$file" ]        # Is a regular file
[ -d "$dir" ]         # Is a directory
[ -x "$script" ]      # Is executable
[ -e "$path" ]        # Exists
```

**Modern alternative — `[[ ]]` (preferred):**
```bash
# Supports regex, pattern matching, no word splitting
if [[ $version =~ ^[0-9]+\.[0-9]+$ ]]; then
    echo "Valid semver"
fi
```
</b></details>

<details>
<summary>In shell scripting, how to negate a conditional?</summary><br><b>

Use `!` before the condition:

```bash
# Negate with !
if [ ! -f /etc/config ]; then
    echo "Config file missing"
fi

# With [[ ]]
if [[ ! $name = "root" ]]; then
    echo "You are not root"
fi

# Negate command exit status
if ! ping -c 1 google.com > /dev/null; then
    echo "No internet connection"
fi
```

**Common pattern — check if file doesn't exist:**
```bash
[ ! -f /etc/app.conf ] && echo "No config found" && exit 1
```
</b></details>

<details>
<summary>In shell scripting, how to check if a given argument is a number?</summary><br><b>

```
regex='^[0-9]+$'
if [[ ${var//*.} =~ $regex ]]; then
...
```
</b></details>

#### Shell Scripting - Arithmetic Operations

<details>
<summary>How to perform arithmetic operations on numbers?</summary><br><b>

Three methods:

```bash
# 1. $(( )) — preferred, POSIX-compliant
result=$(( 10 + 5 ))      # 15
result=$(( 10 * 5 ))      # 50
result=$(( 10 / 3 ))      # 3 (integer division)

# 2. let — builtin
let "result = 10 + 5"

# 3. expr — external command (slower)
result=$(expr 10 + 5)
```

**Common operations:**
```bash
count=$(( count + 1 ))    # Increment
(( count++ ))             # Shorthand
remainder=$(( 10 % 3 ))   # Modulo → 1
power=$(( 2 ** 10 ))      # Exponentiation → 1024
```
</b></details>



<details>
<summary>How to check if a given number has 4 as a factor?</summary><br><b>

`if [ $(($1 % 4)) -eq 0 ]; then`
</b></details>

#### Shell Scripting - Loops

<details>
<summary>What is a loop? What types of loops are you familiar with?</summary><br><b>

Loops repeat a block of code multiple times. Shell supports four loop types:

| Type | Use case |
|------|----------|
| `for` | Iterate over a list of items |
| `while` | Repeat while condition is true |
| `until` | Repeat until condition becomes true |
| `select` | Create interactive menus |

**for — iterate over files/values:**
```bash
for file in *.txt; do
    echo "Processing $file"
done

for i in {1..5}; do
    echo "Iteration $i"
done
```

**while — condition-based repetition:**
```bash
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    ((count++))
done
```

**until — opposite of while:**
```bash
until ping -c 1 google.com; do
    echo "Waiting for network..."
    sleep 5
done
```
</b></details>

<details>
<summary>Demonstrate how to use loops</summary><br><b>

```bash
# for loop — iterate over list
for fruit in apple banana orange; do
    echo "Fruit: $fruit"
done

# for loop — C-style
for (( i=0; i<5; i++ )); do
    echo "i=$i"
done

# while loop — read file line by line
while IFS= read -r line; do
    echo "Line: $line"
done < /etc/hosts

# while — infinite loop with break
while true; do
    read -p "Enter name (or 'quit'): " name
    [[ $name = "quit" ]] && break
    echo "Hello $name"
done

# select — interactive menu
select option in "Install" "Update" "Quit"; do
    case $option in
        Install) echo "Installing..."; break ;;
        Update)   echo "Updating..."; break ;;
        Quit)     exit ;;
    esac
done
```
</b></details>

#### Shell Scripting - Troubleshooting

<details>
<summary>How do you debug shell scripts?</summary><br><b>

Answer depends on the language you are using for writing your scripts. If Bash is used for example then:

  * Adding -x to the script I'm running in Bash
  * Old good way of adding echo statements

If Python, then using pdb is very useful.
</b></details>

<details>
<summary>Running the following bash script, we don't get 2 as a result, why?

```
x = 2
echo $x
```
</summary><br><b>

Should be `x=2`
</b></details>

#### Shell Scripting - Substring

<details>
<summary>How to extract everything after the last dot in a string?</summary><br><b>

`${var//*.}`
</b></details>

<details>
<summary>How to extract everything before the last dot in a string?</summary><br><b>

${var%.*}
</b></details>

#### Shell Scripting - Misc

<details>
<summary>Generate 8 digit random number</summary><br><b>

shuf -i 9999999-99999999 -n 1
</b></details>

<details>
<summary>Can you give an example to some Bash best practices?</summary><br><b>

Essential Bash best practices for production scripts:

1. **Start with `set -euo pipefail`:**
```bash
#!/bin/bash
set -euo pipefail
# -e: exit on any error
# -u: error on undefined variables
# -o pipefail: fail if any command in a pipe fails
```

2. **Quote variables to prevent word splitting:**
```bash
# ❌ Breaks if filename has spaces
rm $file
# ✅ Correct
rm "$file"
```

3. **Use `$( )` instead of backticks:**
```bash
# ❌ Hard to nest and read
files=`ls \`pwd\``
# ✅ Clear and nestable
files=$(ls "$(pwd)")
```

4. **Prefer `[[ ]]` over `[ ]`** for safer tests (Bash/Zsh).

5. **Use meaningful variable names** (UPPERCASE for env vars, lowercase for local).

6. **Check exit codes of critical commands:**
```bash
if ! command_that_might_fail; then
    echo "Fatal error" >&2
    exit 1
fi
```

7. **Use `trap` for cleanup:**
```bash
trap 'rm -f /tmp/lock' EXIT
```

8. **Validate input** — never trust user input without validation.

9. **ShellCheck** — always lint with `shellcheck script.sh`.
</b></details>

<details>
<summary>What is the ternary operator? How do you use it in bash?</summary><br><b>

A short way of using if/else. An example:

```bash
[[ $a = 1 ]] && b="yes, equal" || b="nope"
```

**Caveat:** The `&&`/`||` pattern is NOT a true ternary — if the first command succeeds but the second fails, the third runs anyway. For safety:
```bash
# Safer — use if/else for complex logic
if [[ $a = 1 ]]; then b="yes"; else b="no"; fi
```
</b></details>

<details>
<summary>What does the following code do and when would you use it?

<code>diff <(ls /tmp) <(ls /var/tmp)</code>

</summary><br><b>

It's called **process substitution** — `<(command)` creates a temporary file descriptor with the command's output, allowing you to pass it to commands like `diff` that expect file paths (not stdin).

**When to use:** When a command needs file arguments but you want to compare command output without creating temporary files.

**More examples:**
```bash
# Compare two command outputs
diff <(ls dir1) <(ls dir2)

# Feed command output as a "file"
while read line; do echo "Got: $line"; done < <(grep "ERROR" /var/log/app.log)
```
</b></details>

<details>
<summary>What are you using for testing shell scripts?</summary><br><b>

**Bats** (Bash Automated Testing System) is the most popular framework for testing shell scripts:

```bash
# test/my_script.bats
#!/usr/bin/env bats

@test "script exits with 0" {
  run ./my_script.sh
  [ "$status" -eq 0 ]
}

@test "script outputs expected string" {
  run ./my_script.sh hello
  [ "$output" = "Hello, hello" ]
}
```

**ShellCheck** for static analysis:
```bash
shellcheck my_script.sh    # Catch bugs and anti-patterns
```

**Other testing tools:** shUnit2, bash_unit, roundup.
</b></details>

