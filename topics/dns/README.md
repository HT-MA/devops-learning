## DNS

<details>
<summary>What is DNS? What is it used for?</summary><br><b>

DNS (Domain Name Systems) is a protocol used for converting domain names into IP addresses.<br>
computer networking (at layer 3 of the OSP model) is done with IP addresses but for as humans it's hard to remember IP addresses, it's much easier to remember names. This why we need something such as DNS to convert any domain name we type into an IP address. You can think on DNS as a huge phonebook or database where each corresponding name has an IP.
</b></details>

<details>
<summary>What is DNS resolution?</summary><br><b>

DNS resolution is the process of converting a domain name (like `www.example.com`) into an IP address (like `93.184.216.34`) that computers use to route traffic. It works in reverse too — reverse DNS (PTR records) maps IP → domain name.

**Two types:**
| | Recursive | Iterative |
|---|---|---|
| **Who does the work** | DNS resolver | DNS resolver + client |
| **Typical client** | End user's browser | DNS server to DNS server |
| **Example** | Your ISP's resolver fully resolves google.com for you | A resolver asks root→TLD→authoritative step by step |
</b></details>

<details>
<summary>What is a name server?</summary><br><b>

A server which is responsible for resolving DNS queries.
</b></details>

<details>
<summary>What is the resolution sequence of: www.site.com</summary><br><b>

It's resolved in this order:

1) .
2) .com
3) site.com
4) www.site.com
</b></details>

<details>
<summary>What is a domain name registrar?</summary><br><b>

[Cloudflare](https://www.cloudflare.com/en-gb/learning/dns/glossary/what-is-a-domain-name-registrar): "A domain name registrar provides domain name registrations to the general public. A common misconception is that registrars sell domain names; these domain names are actually owned by registries and can only be leased by users."
</b></details>

<details>
<summary>Given the following fqdn, <code>www.blipblop.com</code>, what is the root?</summary><br><b>

`.` is the root
</b></details>

<details>
<summary>Given the following fqdn, <code>www.blipblop.com</code>, what is the top level domain?</summary><br><b>

`.com.` is the top level domain
</b></details>

<details>
<summary>Given the following fqdn, <code>www.blipblop.com</code>, what is the second level domain?</summary><br><b>

`blipblop.com.` is the second level domain
</b></details>

<details>
<summary>Given the following fqdn, <code>www.blipblop.com</code>, what is the domain?</summary><br><b>

`www.blipblop.com.` is the domain
</b></details>

<details>
<summary>Describe DNS resolution workflow in high-level</summary><br><b>

In general the process is as follows:

  * The user types an address in the web browser (some_site.com)
  * The operating system gets a request from the browser to translate the address the user entered
  * A query created to check if a local entry of the address exists in the system. In case it doesn't, the request is forwarded to the DNS resolver
  * The Resolver is a server, usually configured by your ISP when you connect to the internet, that responsible for resolving your query by contacting other DNS servers
  * The Resolver contacts the root nameserver (aka as .)
  * The root nameserver either responds with the address you are looking for or it responds with the address of the relevant Top Level Domain DNS server (if your address ends with org then the org TLD)
  * The Resolver then contacts the TLD DNS. TLD DNS might respond with the address you are looking for. If it doesn't has the information, it will provide the address of SLD DNS server
  * SLD DNS server will reply with the address to the resolver
  * The Resolver passes this information to the browser while your OS also stores this information in the cache
  * The user cab browse the website with happiness and joy :D
</b></details>

##### DNS - Records

<details>
<summary>What is a DNS record?</summary><br><b>

A mapping between domain name and an IP address.
</b></details>

<details>
<summary>What types of DNS records are there?</summary><br><b>

Common DNS record types:

| Type | Purpose | Example |
|------|---------|---------|
| **A** | Name → IPv4 address | `example.com. A 93.184.216.34` |
| **AAAA** | Name → IPv6 address | `example.com. AAAA 2606:2800:220:1:248:1893:25c8:1946` |
| **CNAME** | Alias → canonical name | `www.example.com. CNAME example.com.` |
| **MX** | Mail server for domain | `example.com. MX 10 mail.example.com.` |
| **NS** | Authoritative name servers | `example.com. NS ns1.example.com.` |
| **PTR** | IP → name (reverse DNS) | `34.216.184.93.in-addr.arpa. PTR example.com.` |
| **TXT** | Arbitrary text data | SPF, DKIM, domain verification |
| **SOA** | Start of Authority — zone metadata | Serial number, refresh/retry timers |
| **SRV** | Service location (host:port) | `_sip._tcp.example.com. SRV 10 60 5060 sip.example.com.` |
| **CAA** | Certificate Authority Authorization | Which CAs can issue certs for this domain |

More types: [DNS Record Types](https://www.nslookup.io/learning/dns-record-types/)
</b></details>

<details>
<summary>What is a A record?</summary><br><b>

A (Address): Maps a host name to an IPv4 address.

When a computer has multiple adapter cards and IP addresses, it should have multiple address records.
</b></details>

<details>
<summary>What is a AAAA record?</summary><br><b>

An AAAA Record performs the same function as an A Record, but for an IPv6 Address.
</b></details>

<details>
<summary>What is a CNAME record?</summary><br><b>

CNAME: maps a hostname to another hostname.

The target should be a domain name which must have an A or AAAA record. Think of it as an alias record.
</b></details>

<details>
<summary>What is a PTR record?</summary><br><b>

While an A record points a domain name to an IP address, a PTR record does the opposite and resolves the IP address to a domain name.
</b></details>

<details>
<summary>What is a MX record?</summary><br><b>

MX (Mail Exchange) Specifies a mail exchange server for the domain, which allows mail to be delivered to the correct mail servers in the domain.
</b></details>

<details>
<summary>What is a NS record?</summary><br><b>

NS: name servers that can respond to DNS queries
</b></details>

##### DNS - TTL

<details>
<summary>Explain DNS Records TTL</summary><br><b>

[varonis.com](https://www.varonis.com/blog/dns-ttl): "DNS TTL (time to live) is a setting that tells the DNS resolver how long to cache a query before requesting a new one. The information gathered is then stored in the cache of the recursive or local resolver for the TTL before it reaches back out to collect new, updated details."
</b></details>

##### DNS - Misc

<details>
<summary>Is DNS using TCP or UDP?</summary><br><b>

DNS uses UDP port 53 for resolving queries either regular or reverse. DNS uses TCP for zone transfer.
</b></details>

<details>
<summary>True or False? DNS can be used for load balancing</summary><br><b>

True. DNS-based load balancing distributes traffic by returning different IP addresses for the same domain name. It's simple, doesn't require a dedicated load balancer, but has limitations — DNS caching means clients may use stale IPs, and it doesn't check server health.

**How it works:**
```
example.com. A 10.0.0.1   (server A)
example.com. A 10.0.0.2   (server B)
example.com. A 10.0.0.3   (server C)
```
The DNS server rotates the order of responses, distributing traffic across servers.
</b></details>

<details>
<summary>Which techniques a DNS can use for load balancing?</summary><br><b>
There are several techniques that a DNS can use for load balancing, including:

* Round-robin DNS

* Weighted round-robin DNS

* Least connections

* GeoDNS
</b></details>

<details>
<summary>What is a DNS zone?</summary><br><b>
A DNS zone is a logical container that holds all the DNS resource records for a specific domain name.
</b></details>

<details>
<summary>What types of zones are there?</summary><br><b>
There are several types, including:

* Primary zone: A primary zone is a read/write zone that is stored in a master DNS server.

* Secondary zone: A secondary zone is a read-only copy of a primary zone that is stored in a slave DNS server. 

* Stub zone: A stub zone is a type of zone that contains only the essential information about a domain name. It is used to reduce the amount of DNS traffic and improve the efficiency of the DNS resolution process.
</b></details>

### DNS Troubleshooting & Tools

<details>
<summary>What tools do you use to troubleshoot DNS issues?</summary><br><b>

```bash
# dig — most powerful DNS lookup tool
dig example.com                    # Full DNS query with all details
dig example.com +short             # Just the IP
dig example.com MX                 # Mail server records
dig @8.8.8.8 example.com           # Query specific DNS server
dig -x 8.8.8.8                     # Reverse DNS lookup
dig example.com +trace             # Trace full resolution path from root

# nslookup — simpler, cross-platform
nslookup example.com
nslookup example.com 8.8.8.8      # Specify DNS server

# host — quick, simple
host example.com

# whois — domain registration info
whois example.com
```

**Common troubleshooting workflow:**
1. `dig example.com +short` — can you resolve the name at all?
2. `dig example.com +trace` — where does resolution break?
3. `dig @8.8.8.8 example.com` — is your local DNS resolver the problem?
4. Check `/etc/resolv.conf` for DNS server configuration
5. Check `/etc/hosts` for local overrides
</b></details>

### Advanced DNS

<details>
<summary>What is DNSSEC? Why is it important?</summary><br><b>

DNSSEC (Domain Name System Security Extensions) adds cryptographic signatures to DNS records, ensuring responses are authentic and haven't been tampered with. Without DNSSEC, an attacker can poison DNS caches and redirect traffic to malicious sites.

**How it works:**
- Each DNS zone signs its records with a private key
- Resolvers verify the signature using the zone's public key (published as a DS record in the parent zone)
- Forms a "chain of trust" from the root zone (`.`) down

**What it protects against:**
- DNS cache poisoning (Kaminsky attack)
- Man-in-the-middle DNS spoofing
- Response tampering

**What it does NOT protect:**
- Confidentiality (DNS queries are still unencrypted — use DoH/DoT for that)
- DDoS attacks
- Phishing (if the original site is compromised)

**Validation check:**
```bash
dig example.com +dnssec     # Look for the `ad` flag (Authenticated Data)
```
</b></details>

<details>
<summary>What is DNS over HTTPS (DoH) and DNS over TLS (DoT)?</summary><br><b>

Both encrypt DNS queries to prevent eavesdropping and tampering:

| | DoH (DNS over HTTPS) | DoT (DNS over TLS) |
|---|---|---|
| **Port** | 443 | 853 |
| **Protocol** | HTTP/2 + TLS | DNS over TLS |
| **Blends in** | Looks like regular HTTPS traffic | Separate port, identifiable |
| **Best for** | Privacy (harder to block/filter) | Enterprise (can be controlled via firewall) |

**Why they matter:**
- Traditional DNS (UDP/53) is plaintext — anyone on the network can see what sites you visit
- ISPs and governments can intercept and redirect DNS queries
- DoH/DoT encrypts the query, so only you and the DNS resolver know what you're looking up

**DoH resolvers:** Cloudflare (`1.1.1.1`), Google (`8.8.8.8`), Quad9 (`9.9.9.9`)
</b></details>

<details>
<summary>What is Split-horizon DNS?</summary><br><b>

Split-horizon (or split-brain) DNS serves different DNS responses based on where the query comes from — internal network vs. the internet.

**Use case:**
- Internal users resolve `mail.company.com` → `10.0.1.50` (internal IP)
- External users resolve `mail.company.com` → `203.0.113.50` (public IP)
- Same domain name, different answers based on source

**Why use it:**
- Simpler internal URLs (no `mail.internal.company.com`)
- Security — internal server IPs are hidden from the public internet
- Performance — internal traffic stays on the internal network

**Implementation:** BIND views, Route53 Resolver rules (AWS), or separate internal/external DNS servers.
</b></details>

<details>
<summary>What is Anycast DNS?</summary><br><b>

Anycast DNS advertises the same IP address from multiple physical locations. When a user sends a DNS query, BGP routing sends it to the nearest (lowest latency) DNS server advertising that IP.

**Benefits:**
- **Low latency** — Users hit the geographically closest server
- **DDoS resilience** — Attack traffic is distributed across all locations, each absorbing a fraction
- **Automatic failover** — If one location goes down, BGP withdraws the route and traffic flows to the next nearest

**Who uses it:** All major public DNS services — Cloudflare `1.1.1.1`, Google `8.8.8.8`, OpenDNS. This is why `ping 8.8.8.8` is consistently fast from anywhere in the world — you're hitting a nearby Google data center, not Mountain View.

**vs. Unicast:** Traditional DNS uses unicast — different IP per server, geographic routing via GeoDNS (returning different IPs based on requester location). Anycast is simpler at the network layer.
</b></details>

