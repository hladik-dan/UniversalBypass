//
//  SafariExtensionViewController.swift
//  UniversalBypass Extension
//
//  Created by Daniel Hladík on 06/11/2019.
//  Copyright © 2019 Daniel Hladík. All rights reserved.
//

import SafariServices

class SafariExtensionViewController: SFSafariExtensionViewController {
    
    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.preferredContentSize = NSSize(width:320, height:240)
        return shared
    }()

}
