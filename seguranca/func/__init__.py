import os
import shlex
import subprocess
from prompt_toolkit import prompt
from prompt_toolkit.completion import PathCompleter

def listar_arquivos(pasta):
    comando = f'ls {pasta}'
    subprocess.run(shlex.split(comando), check=True)
