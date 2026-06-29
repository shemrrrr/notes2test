#test #ready
[Test: VLAN](../web/index.html?test=vlan)

A VLAN is a **Virtual Local Area Network**, meaning the virtual - or logical, as opposed to the physical - implementation of a local network. VLANs primarily serve the segmentation of local networks. In contrast to a conventional switched network, when using VLANs, not all devices on all switch ports can communicate directly with each other. For this reason, the use of a router or a Layer 3 switch (a switch with a routing function that can mediate between different IP subnets) is required to connect VLANs.

### Reasons for Using VLANs

A LAN, for example in companies or public authorities, can become very large in its modern form and enable a multitude of **different services** based on network packets. Managed switches are used in modern corporate networks. These are slightly more expensive, but in return, they enable a multitude of configuration options.

**Security** The logical separation of **local networks** is used for various reasons. The main reason was to increase network security. For attackers, access to data and devices in different subnets is at least made more difficult. Access can be well controlled by a firewall between the segments.

**Performance** Through segmentation using VLANs, time-critical data can be separated from the rest of the **data traffic**. In a VLAN, data for **telephony, video streaming, or control data** for machines can be transmitted with guaranteed transit and response times, independently of the total data volume. Using QoS (Quality of Services - prioritizing specific data types), performance can also be guaranteed over routed connections to other VLANs or over the Internet.

**Load Reduction** By segmenting a large network into VLANs, the total data volume in the network is reduced, since broadcasts are only distributed within their respective **subnet**. In a large network, all broadcasts from the devices would flood across the entire network; through segmentation, they remain within the VLANs.

**Flexibility** Because VLANs can be easily configured and changed, flexibility in the network increases. If a device moves to a different location, the corresponding port on the switch can be reprogrammed, and the device can continue to operate as usual. Without VLANs, extensive cabling work would be necessary. Likewise, the reverse case - moving a device to a different subnet - can be implemented by simply changing its affiliation.

**Organization** By assigning devices to a VLAN, sorting by areas and departments can take place. Devices at different locations in the network can be assigned to a VLAN and thus logically belong together.

**Configuration** There are different techniques to configure VLANs and assign ports to VLANs. Depending on the technique, a distinction is made between port-based or tagged VLANs. If the port assignment is fixed, it is called a **static VLAN**, whereas if the port assignment is variable, it is called a **dynamic** one.

### Port-based VLAN

With port-based VLANs, exactly one VLAN is assigned to each port of a switch. Direct data traffic is only possible between the ports of a VLAN. With the number of VLANs and switches, the number of connections for VLAN transmission increases exponentially. The method is therefore only practical for a small number of VLANs and switches.

### Tagged VLAN

Tagged VLANs represent an extension of the Ethernet standard and can only be used with switches specifically designed for this purpose. The Ethernet frame is extended by the so-called tag, which represents the VLAN ID of the associated network packet. The VLAN tag is four bytes long, of which 12 bits are used for the VLAN ID. Mathematically, this results in the possibility of creating 4096 VLANs. Due to the changing length of the packets, the method is only applicable to switches and network devices designed for it.

The tag is used to mark the affiliation of packets to a VLAN. As a result, packets of several VLANs can be transmitted over a single port. These ports can be well utilized for connecting switches and significantly reduce the wiring effort. Today, a mixture of port- and tag-based VLANs is used in modern switches. So-called access ports for connecting devices are assigned to a VLAN (port-based), while tagging is used on ports for coupling network devices like switches or routers. This makes it possible to use the advantages of VLAN tagging without all devices in the network having to be able to handle tags.

### Static VLANs

Static VLANs are practically equivalent to port-based ones. The port assignment is permanently specified and only changes upon reconfiguration by the administrator.

### Dynamic VLANs

To implement a dynamic VLAN, the switch requires a certain intelligence. The assignment of a port to a VLAN is determined by programmable characteristics of the passing network packets. The switch recognizes the predefined patterns and automatically assigns a port to the corresponding VLAN. During switch configuration, the administrator defines certain rules according to which a port is assigned to a VLAN. These can be MAC addresses, protocol types, TCP/UDP ports, and much more. Based on the rules, access to the network and to specific VLANs can be controlled. In this way, mobile devices can always be assigned to the same VLAN regardless of their location.