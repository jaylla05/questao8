import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';

const VAZIO = { nome: '', matricula: '', email: '', curso: '' };

export default function App() {
  const [form, setForm] = useState(VAZIO);
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState('');

  const set = (k, v) => setForm({ ...form, [k]: v });

  const cadastrar = () => {
    const aluno = {
      nome: form.nome.trim(),
      matricula: form.matricula.trim(),
      email: form.email.trim(),
      curso: form.curso.trim(),
    };
    if (!aluno.nome || !aluno.matricula || !aluno.email || !aluno.curso)
      return setErro('Preencha todos os campos obrigatórios.');
    if (!aluno.email.includes('@')) return setErro('Informe um e-mail válido.');
    if (alunos.some((a) => a.matricula === aluno.matricula))
      return setErro('Já existe um aluno com essa matrícula.');
    setAlunos([...alunos, aluno]);
    setForm(VAZIO);
    setErro('');
  };

  const remover = (matricula) => setAlunos(alunos.filter((a) => a.matricula !== matricula));

  return (
    <ScrollView style={s.c} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
      <Text style={s.t}>👩‍🎓 Cadastro de estudantes</Text>
      <TextInput style={s.i} placeholder="Nome" value={form.nome} onChangeText={(v) => set('nome', v)} />
      <TextInput style={s.i} placeholder="Matrícula" value={form.matricula} onChangeText={(v) => set('matricula', v)} />
      <TextInput style={s.i} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(v) => set('email', v)} />
      <TextInput style={s.i} placeholder="Curso" value={form.curso} onChangeText={(v) => set('curso', v)} />
      <Pressable style={s.b} onPress={cadastrar}><Text style={s.bt}>Cadastrar</Text></Pressable>
      {erro !== '' && <Text style={s.e}>{erro}</Text>}

      <Text style={s.sub}>Estudantes cadastrados ({alunos.length})</Text>
      {alunos.length === 0 && <Text style={{ color: '#778' }}>Nenhum estudante cadastrado.</Text>}
      {alunos.map((a) => (
        <View key={a.matricula} style={s.card}>
          <Text style={s.nome}>{a.nome}</Text>
          <Text>Matrícula: {a.matricula}</Text>
          <Text>E-mail: {a.email}</Text>
          <Text>Curso: {a.curso}</Text>
          <Pressable onPress={() => remover(a.matricula)}><Text style={s.rem}>Remover</Text></Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2a44' },
  i: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  b: { backgroundColor: '#3b6cf6', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  bt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  e: { color: '#c0392b', marginTop: 4 },
  sub: { fontSize: 18, fontWeight: '700', marginVertical: 16, color: '#1f2a44' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10 },
  nome: { fontSize: 18, fontWeight: '700', marginBottom: 4, color: '#1f2a44' },
  rem: { color: '#c0392b', marginTop: 8, fontWeight: '600' },
});