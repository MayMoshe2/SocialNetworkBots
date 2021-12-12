import time
import logging
import sys
import os
import re
from dataclasses import dataclass
from typing import Dict, Set
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import chromedriver_binary
class DeliveryTracker:
    def __init__(self, filename):
        self.filename = filename
        self.already_sent = set()
        self.update_delivered_users()

    def update_delivered_users(self):
        with open(self.filename) as f:
            user_full_names = [user_full_name.strip() for user_full_name in f]
        self.already_sent.update(user_full_names)

    def get_delivered_users(self) -> Set:
        return self.already_sent

    def add_user_to_delivered_list(self, full_name: str):
        if full_name not in self.already_sent:
            self.already_sent.add(full_name)
            with open(self.filename, "a") as f:
                f.write(f"{full_name}\n")

    def already_delivered(self, full_name) -> bool:
        return full_name in self.already_sent
