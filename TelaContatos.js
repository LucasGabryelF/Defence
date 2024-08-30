import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaContatos({ navigation }) {
  // Exemplo de contatos cadastrados
  const [contatos, setContatos] = useState([
    { id: '1', nome: 'João Silva', email: 'joao@gmail.com', telefone: '123456789', descricao: 'Cliente VIP' },
    { id: '2', nome: 'Maria Souza', email: 'maria@hotmail.com', telefone: '987654321', descricao: 'Cliente regular' },
    { id: '3', nome: 'Carlos Pereira', email: 'carlos@outlook.com', telefone: '1122334455', descricao: 'Novo cliente' },
    { id: '4', nome: 'Ana Costa', email: 'ana@yahoo.com', telefone: '6677889900', descricao: 'Cliente especial' },
    { id: '5', nome: 'Pedro Lima', email: 'pedro@gmail.com', telefone: '2233445566', descricao: 'Cliente frequente' },
    { id: '6', nome: 'Luiza Oliveira', email: 'luiza@hotmail.com', telefone: '9988776655', descricao: 'Cliente potencial' },
    { id: '7', nome: 'Rafael Nunes', email: 'rafael@outlook.com', telefone: '5566778899', descricao: 'Cliente regular' },
    { id: '8', nome: 'Fernanda Gomes', email: 'fernanda@yahoo.com', telefone: '7788990011', descricao: 'Cliente VIP' },
    { id: '9', nome: 'Lucas Dias', email: 'lucas@gmail.com', telefone: '3344556677', descricao: 'Novo cliente' },
  ]);

  const handleEdit = (id) => {
    console.log('Editando contato:', id);
  };

  const handleDelete = (id) => {
    console.log('Excluindo contato:', id);
    setContatos(contatos.filter(contato => contato.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>Nome: {item.nome}</Text>
      <Text style={styles.contactText}>E-mail: {item.email}</Text>
      <Text style={styles.contactText}>Telefone: {item.telefone}</Text>
      <Text style={styles.contactText}>Descrição: {item.descricao}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(item.id)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botão Voltar reposicionado */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lista de Contatos</Text>
      <FlatList
        data={contatos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={3} // Definindo 3 colunas
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Aumenta o espaçamento para dar lugar ao botão "Voltar"
    paddingHorizontal: 10,
    backgroundColor: '#1c1b22',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  contactItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    margin: 5,
    flex: 1,
    maxWidth: '30%',
  },
  contactText: {
    color: '#fff',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20, // Ajusta a posição para o topo
    left: 10,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    zIndex: 10, // Garante que o botão fique na frente de outros elementos
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
