# Pyserial modules

To be able to run this application without having to install additional packages, we have included these modules with the Ardublockly ardublocklyserver Python package.

These modules have been extracted and modified from the pyserial package
version 2.7: [https://pypi.python.org/pypi/pyserial](https://pypi.python.org/pypi/pyserial)

Only the required functionality to detect available Serial Ports has been copied.


## Pyserial license
Copyright (C) 2001-2013 Chris Liechti <cliechti(at)gmx.net>; All Rights Reserved.

This is the Python license. In short, you can use this product in commercial and non-commercial applications, modify it, redistribute it. A notification to the author when you use and/or modify it is welcome.

TERMS AND CONDITIONS FOR ACCESSING OR OTHERWISE USING THIS SOFTWARE

LICENSE AGREEMENT

    This LICENSE AGREEMENT is between the copyright holder of this product, and the Individual or Organization (“Licensee”) accessing and otherwise using this product in source or binary form and its associated documentation.
    Subject to the terms and conditions of this License Agreement, the copyright holder hereby grants Licensee a nonexclusive, royalty-free, world-wide license to reproduce, analyze, test, perform and/or display publicly, prepare derivative works, distribute, and otherwise use this product alone or in any derivative version, provided, however, that copyright holders License Agreement and copyright holders notice of copyright are retained in this product alone or in any derivative version prepared by Licensee.
    In the event Licensee prepares a derivative work that is based on or incorporates this product or any part thereof, and wants to make the derivative work available to others as provided herein, then Licensee hereby agrees to include in any such work a brief summary of the changes made to this product.
    The copyright holder is making this product available to Licensee on an “AS IS” basis. THE COPYRIGHT HOLDER MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED. BY WAY OF EXAMPLE, BUT NOT LIMITATION, THE COPYRIGHT HOLDER MAKES NO AND DISCLAIMS ANY REPRESENTATION OR WARRANTY OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THIS PRODUCT WILL NOT INFRINGE ANY THIRD PARTY RIGHTS.
    THE COPYRIGHT HOLDER SHALL NOT BE LIABLE TO LICENSEE OR ANY OTHER USERS OF THIS PRODUCT FOR ANY INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES OR LOSS AS A RESULT OF MODIFYING, DISTRIBUTING, OR OTHERWISE USING THIS PRODUCT, OR ANY DERIVATIVE THEREOF, EVEN IF ADVISED OF THE POSSIBILITY THEREOF.
    This License Agreement will automatically terminate upon a material breach of its terms and conditions.
    Nothing in this License Agreement shall be deemed to create any relationship of agency, partnership, or joint venture between the copyright holder and Licensee. This License Agreement does not grant permission to use trademarks or trade names from the copyright holder in a trademark sense to endorse or promote products or services of Licensee, or any third party.
    By copying, installing or otherwise using this product, Licensee agrees to be bound by the terms and conditions of this License Agreement.


## List of Changes:
* Modified to work within a different directory structure
* serial_to_bytes function imported from a difference source within pyserial
* Minor changes to make it compatible with python 3